const Slot = require("../models/slots.model");
const ParkingHistory = require("../models/parkingHistory.model");

const getParkingAnalytics = async (req, res) => {
  try {
    // Total number of parking slots
    const totalSlots = await Slot.countDocuments();
    console.log("totalSlots: ", totalSlots);

    // Number of currently occupied slots
    const occupiedSlots = await Slot.countDocuments({ status: "Occupied" });
    console.log("occupiedSlots: ", occupiedSlots);
    

    // Occupancy Rate (percentage)
    const occupancyRate =
      totalSlots > 0 ? ((occupiedSlots / totalSlots) * 100).toFixed(2) : "0.00";

    // Average Parking Time in seconds
    const avgDurationData = await ParkingHistory.aggregate([
      {
        $match: {
          duration: { $ne: null }, // Only consider entries with recorded durations
        },
      },
      {
        $group: {
          _id: null,
          avgDuration: { $avg: "$duration" }, // Duration is in seconds
        },
      },
    ]);

    const averageParkingTimeInSeconds =
      avgDurationData.length > 0
        ? Math.round(avgDurationData[0].avgDuration)
        : 0;

    // Total Revenue (only paid entries)
    const revenueData = await ParkingHistory.aggregate([
      {
        $match: { payStatus: "Paid", cost: { $ne: null } },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$cost" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Send analytics response
    return res.status(200).json({
      totalSlots,
      occupancyRate: `${occupancyRate}%`,
      averageParkingTimeInSeconds,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching parking analytics:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getParkingAnalytics };
