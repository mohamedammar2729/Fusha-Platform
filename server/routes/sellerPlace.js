const express = require("express");
const router = express.Router();
const { SellerPlace } = require("../models/sellerPlaceModel");
const sellerAuthMiddleware = require("../middlewares/sellerAuthMiddleware");

// Add a new place - only for sellers
router.post("/", sellerAuthMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      address,
      city,
      phone,
      email,
      website,
      priceRange,
      features,
      isAccessible,
      hasParkingSpace,
      weekdayHours,
      weekendHours,
      customHours,
      customSchedule,
      images,
      amenities,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !category ||
      !address ||
      !city ||
      !images ||
      images.length === 0
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPlace = new SellerPlace({
      name,
      description,
      category,
      address,
      city,
      phone,
      email,
      website,
      priceRange,
      features,
      isAccessible,
      hasParkingSpace,
      weekdayHours,
      weekendHours,
      customHours,
      customSchedule,
      images,
      amenities,
      seller_id: req.user.userid,
      isApproved: false,
      rejectionReason: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newPlace.save();
    res.status(201).json({
      success: true,
      message: "تم إضافة المكان بنجاح وسيتم مراجعته قريباً",
      place: newPlace,
    });
  } catch (err) {
    console.error("Error adding place:", err);
    res.status(500).json({ error: "Failed to add place" });
  }
});

// Get all places for the current seller
router.get("/my-places", sellerAuthMiddleware, async (req, res) => {
  try {
    const places = await SellerPlace.find({ seller_id: req.user.userid }).sort({
      createdAt: -1,
    });

    // Add any additional data needed by the frontend
    const placesWithStats = places.map((place) => {
      return {
        ...place._doc,
        views: Math.floor(Math.random() * 500), // For demo purposes - replace with actual logic
        visits: Math.floor(Math.random() * 200), // For demo purposes - replace with actual logic
        rating: place.rating || Math.random() * 3 + 2, // Demo random rating between 2-5
      };
    });

    res.json(placesWithStats);
  } catch (e) {
    console.error("Error fetching seller places:", e);
    res.status(500).send({ error: "Failed to fetch places" });
  }
});

// Get a specific place by ID (if it belongs to the current seller)
router.get("/my-places/:id", sellerAuthMiddleware, async (req, res) => {
  try {
    const place = await SellerPlace.findOne({
      _id: req.params.id,
      seller_id: req.user.userid,
    });

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.json(place);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Add a route for detailed place information
router.get("/my-places/:id/details", sellerAuthMiddleware, async (req, res) => {
  try {
    const place = await SellerPlace.findOne({
      _id: req.params.id,
      seller_id: req.user.userid,
    });

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Add statistics or additional information as needed
    const placeWithStats = {
      ...place._doc,
      stats: {
        views: Math.floor(Math.random() * 500), // For demo purposes
        visits: Math.floor(Math.random() * 200), // For demo purposes
        ratings: place.rating || Math.random() * 3 + 2, // Demo rating
        reviewsCount: Math.floor(Math.random() * 50), // Demo reviews count
      },
    };

    res.json(placeWithStats);
  } catch (e) {
    console.error("Error fetching place details:", e);
    res.status(500).send({ error: "Failed to fetch place details" });
  }
});

// Add a route specifically for statistics
router.get(
  "/my-places/:id/statistics",
  sellerAuthMiddleware,
  async (req, res) => {
    try {
      const place = await SellerPlace.findOne({
        _id: req.params.id,
        seller_id: req.user.userid,
      }).populate({
        path: "reviews.userId",
        select: "username -_id",
      });

      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }

      // For a real application, you'd have more sophisticated statistics
      // For now, we'll return the basic stats with some demo data
      const statistics = {
        views: place.views || Math.floor(Math.random() * 500),
        visits: place.visits || Math.floor(Math.random() * 200),
        rating: place.rating || Math.random() * 3 + 2,
        reviewsCount: place.reviews?.length || Math.floor(Math.random() * 50),
        reviews: place.reviews || [],
        // Could include more stats like:
        // viewsHistory: [...], // time series data
        // trafficSource: {...}, // referral sources
        // demographics: {...}, // user demographics
        // conversionRate: x.xx, // booking/inquiry rate
      };

      res.json(statistics);
    } catch (e) {
      console.error("Error fetching statistics:", e);
      res.status(500).send({ error: "Failed to fetch statistics" });
    }
  }
);

// Update a place
router.put("/:id", sellerAuthMiddleware, async (req, res) => {
  try {
    const place = await SellerPlace.findOne({
      _id: req.params.id,
      seller_id: req.user.userid,
    });

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Update fields from request body
    const fieldsToUpdate = [
      "name",
      "description",
      "category",
      "address",
      "city",
      "phone",
      "email",
      "website",
      "priceRange",
      "features",
      "isAccessible",
      "hasParkingSpace",
      "weekdayHours",
      "weekendHours",
      "customHours",
      "customSchedule",
      "images",
      "amenities",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        place[field] = req.body[field];
      }
    });

    await place.save();
    res.json(place);
  } catch (e) {
    console.error("Update error:", e);
    res.status(500).send(e);
  }
});

// Delete a place
router.delete("/:id", sellerAuthMiddleware, async (req, res) => {
  try {
    const result = await SellerPlace.deleteOne({
      _id: req.params.id,
      seller_id: req.user.userid,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Place not found or you don't have permission" });
    }

    res.json({ message: "Place deleted successfully" });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get all approved places (public route)
router.get("/approved", async (req, res) => {
  try {
    const places = await SellerPlace.find({ isApproved: true });
    res.json(places);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Add this new route to your existing file

// Get all place IDs (for static site generation)
router.get("/all-ids", async (req, res) => {
  try {
    // Only fetch the _id field for efficiency
    const places = await SellerPlace.find({}, { _id: 1 });
    const ids = places.map((place) => place._id.toString());
    res.json({ ids });
  } catch (error) {
    console.error("Error fetching place IDs:", error);
    res.status(500).json({ error: "Failed to fetch place IDs" });
  }
});

module.exports = router;
