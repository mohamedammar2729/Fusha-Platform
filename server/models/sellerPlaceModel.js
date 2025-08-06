const mongoose = require("mongoose");

const sellerPlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  priceRange: {
    type: String,
  },
  features: {
    type: Array,
    default: [],
  },
  isAccessible: {
    type: Boolean,
    default: false,
  },
  hasParkingSpace: {
    type: Boolean,
    default: false,
  },
  weekdayHours: {
    from: String,
    to: String,
  },
  weekendHours: {
    from: String,
    to: String,
  },
  customHours: {
    type: Boolean,
    default: false,
  },
  customSchedule: {
    type: Object,
    default: {},
  },
  images: {
    type: Array,
    required: true,
  },
  amenities: {
    type: Array,
    default: [],
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, // Places need approval by admin before appearing to users
  },
  rejectionReason: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  visits: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      text: String,
      rating: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  featured: {
    type: Boolean,
    default: false,
  },
});

// Update timestamp on document update
sellerPlaceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

exports.SellerPlace = mongoose.model("sellerplaces", sellerPlaceSchema);
