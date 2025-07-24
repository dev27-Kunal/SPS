// models/slot.model.js

const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    slotNumber: {
      type: Number,
      required: true,
    },
    slotType: {
      type: String,
      required: true,
      default: "Standard",
      enum: ["Handicapped", "Electric", "Standard"], // Example types
    },
    status: {
      type: String,
      required: true,
      enum: ["Occupied", "Available"],
      default: "Available",
    },
    position: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    parkingArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingArea",
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPercentage: {
      type: Number,
      default: null
    },
    discountPrice: {
      type: Number,
      default: null
    },
    carDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", SlotSchema);
