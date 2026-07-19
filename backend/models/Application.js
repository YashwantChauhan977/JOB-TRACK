const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Job/Internship role is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Job", "Internship"],
      default: "Job",
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected", "Offer"],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    followUpDate: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
    },
    jobLink: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Helpful indexes for search & filtering
applicationSchema.index({ company: "text", role: "text" });

module.exports = mongoose.model("Application", applicationSchema);