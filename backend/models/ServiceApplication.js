const mongoose = require("mongoose");

const serviceApplicationSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    documents: [
      {
        type: String, // file path
      },
    ],
    status: {
      type: String,
      default: "Pending", // Pending | Approved | Rejected
    },
    appliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ServiceApplication",
  serviceApplicationSchema
);
