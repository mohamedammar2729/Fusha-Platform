const express = require("express");
const router = express.Router();
const { SellerPlace } = require("../models/sellerPlaceModel");
const { User } = require("../models/userModel");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

// Get all pending place approval requests
router.get("/places/pending", adminAuthMiddleware, async (req, res) => {
  try {
    const pendingPlaces = await SellerPlace.find({
      isApproved: false,
      rejectionReason: "",
    })
      .populate("seller_id", "firstname lastname email")
      .sort({ createdAt: -1 });

    res.status(200).json(pendingPlaces);
  } catch (err) {
    console.error("Error fetching pending places:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all approved places
router.get("/places/approved", adminAuthMiddleware, async (req, res) => {
  try {
    const approvedPlaces = await SellerPlace.find({
      isApproved: true,
    })
      .populate("seller_id", "firstname lastname email")
      .sort({ updatedAt: -1 });

    res.status(200).json(approvedPlaces);
  } catch (err) {
    console.error("Error fetching approved places:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all rejected places
router.get("/places/rejected", adminAuthMiddleware, async (req, res) => {
  try {
    const rejectedPlaces = await SellerPlace.find({
      isApproved: false,
      rejectionReason: { $ne: "" },
    })
      .populate("seller_id", "firstname lastname email")
      .sort({ updatedAt: -1 });

    res.status(200).json(rejectedPlaces);
  } catch (err) {
    console.error("Error fetching rejected places:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get place details
router.get("/places/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const place = await SellerPlace.findById(req.params.id).populate(
      "seller_id",
      "firstname lastname email userType profileImage"
    );

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.status(200).json(place);
  } catch (err) {
    console.error("Error fetching place details:", err);
    res.status(500).json({ error: err.message });
  }
});

// Approve place
router.put("/places/:id/approve", adminAuthMiddleware, async (req, res) => {
  try {
    const place = await SellerPlace.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
        rejectionReason: "",
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.status(200).json({ message: "Place approved successfully", place });
  } catch (err) {
    console.error("Error approving place:", err);
    res.status(500).json({ error: err.message });
  }
});

// Reject place with reason
router.put("/places/:id/reject", adminAuthMiddleware, async (req, res) => {
  try {
    const { rejectionReason } = req.body;

    if (!rejectionReason || rejectionReason.trim() === "") {
      return res.status(400).json({ error: "Rejection reason is required" });
    }

    const place = await SellerPlace.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: false,
        rejectionReason: rejectionReason,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.status(200).json({ message: "Place rejected successfully", place });
  } catch (err) {
    console.error("Error rejecting place:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get admin dashboard stats
router.get("/stats", adminAuthMiddleware, async (req, res) => {
  try {
    // Count places by status
    const pendingPlacesCount = await SellerPlace.countDocuments({
      isApproved: false,
      rejectionReason: "",
    });
    const approvedPlacesCount = await SellerPlace.countDocuments({
      isApproved: true,
    });
    const rejectedPlacesCount = await SellerPlace.countDocuments({
      isApproved: false,
      rejectionReason: { $ne: "" },
    });

    // Count users by type
    const regularUsersCount = await User.countDocuments({ userType: "user" });
    const sellerUsersCount = await User.countDocuments({ userType: "seller" });
    const adminUsersCount = await User.countDocuments({ userType: "admin" });

    // Get recent places
    const recentPlaces = await SellerPlace.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("seller_id", "firstname lastname");

    res.status(200).json({
      placesStats: {
        pending: pendingPlacesCount,
        approved: approvedPlacesCount,
        rejected: rejectedPlacesCount,
        total: pendingPlacesCount + approvedPlacesCount + rejectedPlacesCount,
      },
      usersStats: {
        regular: regularUsersCount,
        sellers: sellerUsersCount,
        admin: adminUsersCount,
        total: regularUsersCount + sellerUsersCount + adminUsersCount,
      },
      recentPlaces,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all places (with optional filters)
router.get("/places/all", adminAuthMiddleware, async (req, res) => {
  try {
    const { status, category } = req.query;

    // Build query based on filters
    let query = {};

    if (status === "approved") {
      query.isApproved = true;
    } else if (status === "pending") {
      query.isApproved = false;
      query.rejectionReason = { $exists: false };
    } else if (status === "rejected") {
      query.isApproved = false;
      query.rejectionReason = { $exists: true, $ne: "" };
    }

    if (category && category !== "all") {
      query.category = category;
    }

    const places = await SellerPlace.find(query)
      .populate("seller_id", "firstname lastname email")
      .sort({ updatedAt: -1 });

    res.status(200).json(places);
  } catch (err) {
    console.error("Error fetching places:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
