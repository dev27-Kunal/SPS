// controllers/slot.controller.js

const Slot = require("../models/slots.model");
const Vehicle = require("../models/vehicle.model");
const ParkingArea = require("../models/parkingArea.model");
const ParkingHistory = require("../models/parkingHistory.model");

const createSlot = async (req, res) => {
  try {
    const {
      slotType,
      status,
      position, // { latitude, longitude }
      parkingArea,
      rate,
      discountPrice,
      discountPercentage,
      carDetails,
    } = req.body;

    // Validate parking area exists
    const areaExists = await ParkingArea.findById(parkingArea);
    if (!areaExists) {
      return res.status(400).json({ message: "Invalid parking area ID" });
    }

    // Geo check: Is point inside the polygon?
    const point = {
      type: "Point",
      coordinates: [position.longitude, position.latitude],
    };

    const isInside = await ParkingArea.findOne({
      _id: parkingArea,
      geometry: {
        $geoIntersects: {
          $geometry: point,
        },
      },
    });

    if (!isInside) {
      return res
        .status(400)
        .json({ message: "Slot position is outside the parking area bounds" });
    }

    const lastSlot = await Slot.find({ parkingArea })
      .sort({ slotNumber: -1 })
      .limit(1);

    const slotNumber = lastSlot.length > 0 ? lastSlot[0].slotNumber + 1 : 1;

    const slot = new Slot({
      slotNumber,
      slotType,
      status,
      position,
      parkingArea,
      rate,
      discountPrice,
      discountPercentage,
      carDetails,
    });


    await slot.save();

    const populatedSlot = await Slot.findById(slot._id)
      .populate("carDetails")
      .populate("parkingArea", "areaName");

    res.status(201).json(populatedSlot);
  } catch (err) {
    res.status(500).json({
      message: "Error creating slot",
      error: err.message,
    });
  }
};

const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find()
      .populate("carDetails")
      .populate("parkingArea", "areaName");
    res.json(slots);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching slots", error: err.message });
  }
};

const updateCarDetails = async (req, res) => {
  try {
    const slotId = req.params.id;
    const { driverName, driverPhone, carType, carColor, licencePlateNumber } =
      req.body;

    if (!licencePlateNumber) {
      return res
        .status(400)
        .json({ message: "Licence plate number is required." });
    }

    // 1. Check if vehicle already exists
    let vehicle = await Vehicle.findOne({ licencePlateNumber });

    // 2. If not found, create a new vehicle
    if (!vehicle) {
      vehicle = await Vehicle.create({
        driverName,
        driverPhone,
        carType,
        carColor,
        licencePlateNumber,
      });
    }

    // 3. Update slot with vehicle reference
    const updatedSlot = await Slot.findByIdAndUpdate(
      slotId,
      {
        carDetails: vehicle._id,
        status: "Occupied",
      },
      { new: true }
    ).populate("carDetails");

    if (!updatedSlot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    const parkingEntry = await ParkingHistory.create({
      slotId: updatedSlot._id,
      entryTime: new Date(),
      payStatus: "Unpaid",
      driverId: vehicle._id,
    });

    res.status(200).json({
      message: "Car assigned to slot successfully.",
      data: updatedSlot,
    });
  } catch (error) {
    console.error("Error assigning car to slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/slots/:id/release
const releaseSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const releasedSlot = await Slot.findByIdAndUpdate(
      id,
      {
        carDetails: null,
        status: "Available",
      },
      { new: true }
    ).populate("carDetails"); // Will be null, but kept for consistency

    if (!releasedSlot)
      return res.status(404).json({ message: "Slot not found" });

    const history = await ParkingHistory.findOne({
      slotId: id,
      payStatus: "Unpaid",
    }).sort({ entryTime: -1 });

    if (!history) {
      return res
        .status(400)
        .json({ message: "No unpaid parking history found for this slot." });
    }

    const exitTime = new Date();
    const durationMs = exitTime - history.entryTime;

    // Duration in seconds
    const durationSeconds = Math.floor(durationMs / 1000);

    // Cost in full hours (rounded up)
    const durationHours = Math.ceil(durationSeconds / 3600);
    const cost = durationHours * releasedSlot.rate;

    // 3. Update the history
    history.exitTime = exitTime;
    history.duration = durationSeconds; // Duration in seconds
    history.cost = cost;
    history.payStatus = "Paid";
    await history.save();


    res.json({ message: "Slot released successfully", slot: releasedSlot });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error releasing slot", error: err.message });
  }
};

const filterSlots = async (req, res) => {
  try {
    const { slotType, status, parkingArea } = req.query;

    const filter = {};
    if (slotType) filter.slotType = slotType;
    if (status) filter.status = status;
    if (parkingArea) filter.parkingArea = parkingArea;

    const slots = await Slot.find(filter)
      .populate("carDetails")
      .populate("parkingArea", "areaName");
    res.json(slots);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error filtering slots", error: err.message });
  }
};

// Optionally export more functions like getById, update, delete, etc.

module.exports = {
  createSlot,
  getAllSlots,
  updateCarDetails,
  releaseSlot,
  filterSlots,
};
