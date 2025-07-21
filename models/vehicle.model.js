// models/vehicle.model.js

const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    driverName: {
      type: String,
      required: true,
    },
    driverPhone: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    carColor: {
      type: String,
      required: true,
    },
    licencePlateNumber: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);