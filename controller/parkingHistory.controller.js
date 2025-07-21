// controllers/history.controller.js

const ParkingHistory = require("../models/parkingHistory.model");

const getParkingHistory = async (req, res) => {
  try {
    const history = await ParkingHistory.find()
      .populate({
        path: "slotId",
        populate: [
          { path: "parkingArea", select: "areaName" }, // Populates parkingArea inside Slot
        ],
      }) // Populate slot details
      .populate("driverId")
      .sort({ entryTime: -1 }); // Optional: latest first

    res.status(200).json({
      message: "Parking history fetched successfully",
      data: history,
    });
  } catch (error) {
    console.error("Error fetching parking history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getParkingHistory };
