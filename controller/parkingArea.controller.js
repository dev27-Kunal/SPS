const ParkingArea = require("../models/parkingArea.model");

const createParkingArea = async (req, res) => {
  try {
    const { areaName, geometry } = req.body;

    if (!areaName) {
      return res.status(400).json({ message: "areaName is required" });
    }

    const parkingArea = await ParkingArea.create({
      areaName,
      geometry,
    });

    res.status(201).json({
      message: "Parking Area created successfully",
      data: parkingArea,
    });
  } catch (error) {
    console.error("Error creating parking area:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllParkingAreas = async (req, res) => {
  try {
    const parkingAreas = await ParkingArea.find().select("areaName geometry");
    res.status(200).json(parkingAreas);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching parking areas", error: err.message });
  }
};

const getParkingAreaById = async (req, res) => {
  try {
    const { id } = req.params;

    const parkingArea = await ParkingArea.findById(id).select(
      "areaName geometry"
    );

    if (!parkingArea) {
      return res.status(404).json({ message: "Parking area not found" });
    }

    res.status(200).json(parkingArea);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching parking area", error: err.message });
  }
};

module.exports = { getAllParkingAreas, createParkingArea, getParkingAreaById };