// models/slot.model.js

const mongoose = require("mongoose");

const parkingHistorySchema = new mongoose.Schema({
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
    required: true,
  },
  entryTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  exitTime: {
    type: Date,
    default: null,
  },
  duration: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  payStatus: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    default: null,
  },
});

module.exports = mongoose.model("ParkingHistory", parkingHistorySchema);
