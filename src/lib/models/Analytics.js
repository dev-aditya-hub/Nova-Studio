import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: ["page_visit", "cta_click"],
  },
  page: {
    type: String,
    required: true,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  userAgent: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Analytics =
  mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema);

export default Analytics;
