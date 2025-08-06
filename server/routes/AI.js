const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const createProgramValidator = require("../middlewares/createprogramValidatorMW");
const { places } = require("../models/placesModel"); // Import the places model

require("dotenv").config();
// Use environment variable instead of hardcoded token
// Store this in your .env file
const API_KEY = process.env.AZURE_OPENAI_API_KEY;

// Available destinations from Create.jsx
const AVAILABLE_DESTINATIONS = [
  "القاهرة",
  "الإسكندرية",
  "جنوب سيناء",
  "مطروح",
  "أسوان",
];

// Available trip types from TripType.jsx
const AVAILABLE_TRIP_TYPES = [
  "ثقافية",
  "ترفيهية",
  "عائلية",
  "رومانسية",
  "بحرية",
  "سياحية",
  "مغامرة",
  "دينية",
];

// Helper function to get random item from array
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

router.post("/generate-trip", createProgramValidator, async (req, res) => {
  try {
    // Extract data from request body
    let { destination, people, budget, prompt, tripType } = req.body;

    // Extract trip type from prompt if it's included and no explicit trip type is provided
    if (!tripType && prompt) {
      // Check if any trip type is mentioned in the prompt
      const promptLower = prompt.toLowerCase();
      const foundTripType = AVAILABLE_TRIP_TYPES.find((type) =>
        promptLower.includes(type.toLowerCase())
      );

      if (foundTripType) {
        tripType = foundTripType;
        console.log(
          `Trip type "${tripType}" extracted from prompt: "${prompt}"`
        );
      }
    }

    // Extract destination from prompt if it's included and no explicit destination is provided
    if (!destination && prompt) {
      // Check if any destination is mentioned in the prompt
      const promptLower = prompt.toLowerCase();
      const foundDestination = AVAILABLE_DESTINATIONS.find((dest) =>
        promptLower.includes(dest.toLowerCase())
      );

      if (foundDestination) {
        destination = foundDestination;
        console.log(
          `Destination "${destination}" extracted from prompt: "${prompt}"`
        );
      }
    }

    // If no destination provided, select random one
    if (!destination) {
      destination = getRandomItem(AVAILABLE_DESTINATIONS);
    }

    // If still no trip type provided, select random one
    if (!tripType) {
      tripType = getRandomItem(AVAILABLE_TRIP_TYPES);
    }

    // Default values if not provided
    people = people || "2";
    budget = budget || "1000";

    // Query database for matching places (3-5 random places)
    let databasePlaces = [];
    try {
      // First try: Find places that match BOTH trip type AND destination
      databasePlaces = await places.aggregate([
        {
          $match: {
            category: tripType,
            city: destination, // Add city/destination filter
          },
        },
        { $sample: { size: 3 } },
      ]);

      // Second try: If not enough places found matching both criteria, try just by destination
      if (databasePlaces.length < 3) {
        databasePlaces = await places.aggregate([
          { $match: { city: destination } }, // Match only by destination
          { $sample: { size: 5 } },
        ]);
      }

      // Last resort: If still not enough, get random places
      if (databasePlaces.length < 3) {
        databasePlaces = await places.aggregate([{ $sample: { size: 5 } }]);
      }

      // Convert MongoDB documents to plain objects
      databasePlaces = databasePlaces.map((place) => ({
        name: place.name,
        description: place.description,
        price: place.price,
        rate: place.rate,
        image: place.image || "",
        category: place.category,
        city: place.city, // Include city in the response
      }));
    } catch (dbError) {
      console.error("Error fetching places from database:", dbError);
      // Continue even if database fetch fails
    }

    // Construct the AI prompt
    const aiPrompt = `أنشئ خطة رحلة إلى ${destination} لـ ${people} أشخاص بميزانية ${budget} ريال.
    نوع الرحلة: ${tripType}
    الاهتمامات: ${prompt || "عامة"}
    
    يجب أن تتضمن خطة الرحلة الأماكن التالية: ${databasePlaces
      .map((p) => p.name)
      .join(", ")}
    
    قم بتنسيق الرد ككائن JSON بالهيكل التالي:
    {
      "destination": "${destination}",
      "tripType": "${tripType}",
      "people": ${people},
      "budget": ${budget},
      "places": [
        {"name": "اسم المكان", "type": "نوع المكان", "description": "وصف موجز","image": "رابط الصورة"},
      ],
      "schedule": [
        {"day": 1, "activities": [{"time": "الوقت", "activity": "النشاط", "place": "المكان"}]}
      ],
      "tips": ["نصائح للرحلة"]
    }`;

    // Call the AI API
    const response = await fetch(
      "https://models.inference.ai.azure.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "أنت مساعد سياحي خبير في مصر. استخدم الأماكن المقدمة في إنشاء خطة الرحلة.",
            },
            { role: "user", content: aiPrompt },
          ],
          model: "gpt-4o",
          temperature: 0.7,
          max_tokens: 1500,
          top_p: 1,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API error response:", errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    try {
      const aiResponse = JSON.parse(data.choices[0].message.content);

      // Enhance response with actual database places
      if (databasePlaces.length > 0) {
        // Merge AI-generated places with database places
        const placesFromAI = aiResponse.places || [];
        aiResponse.places = [
          ...databasePlaces,
          ...placesFromAI
            .filter((p) => !databasePlaces.some((dp) => dp.name === p.name))
            .slice(0, 3),
        ];
      }
      // Add metadata about the selection
      aiResponse.metadata = {
        randomlySelectedDestination: !req.body.destination,
        randomlySelectedTripType: !req.body.tripType,
        selectedTripType: tripType,
        placesFromDatabase: databasePlaces.length,
      };

      res.json(aiResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      res.status(500).json({
        error: "فشل في معالجة استجابة الذكاء الاصطناعي",
        rawContent: data.choices[0].message.content,
      });
    }
  } catch (err) {
    console.error("AI trip generation error:", err);
    res.status(500).json({ error: "فشل إنشاء الرحلة", details: err.message });
  }
});

module.exports = router;
