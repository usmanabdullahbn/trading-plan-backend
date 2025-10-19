const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  script: { type: String, required: true },
  quantity: { type: Number, required: true },
  buyingRange: { type: String, required: true },
  avgPrice: { type: Number, required: true },
  stopLoss: { type: Number, required: true },
  supportLevels: [{ type: Number }],
  resistanceLevels: [{ type: Number }],
  takeProfitTargets: [{ type: Number }],
  exitPlan: { type: String },
  trailingPlan: { type: String },
  description: { type: String }, // 🆕 Added
  remarks: { type: String, default: "" }, // 🆕 Added (will be filled at close)
  status: { type: String, enum: ["active", "completed"], default: "active" },
  outcome: {
    type: String,
    enum: ["win", "loss", "pending"],
    default: "pending",
  },
  profitLoss: { type: Number, default: 0 },
});

module.exports = mongoose.model("Trade", tradeSchema);
