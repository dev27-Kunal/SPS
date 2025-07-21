// routes/index.js

const express = require("express");
const router = express.Router();

// Import all route modules
const slotRoutes = require("./slots.routes");
const parkingRoutes = require("./parkingArea.routes");
const parkingHistory = require("./parkingHistory.routes");
const statistics = require("./statistics.routes");

// Mount them under sub-paths
router.use("/slots", slotRoutes);
router.use("/parking-areas", parkingRoutes);
router.use("/parking-history", parkingHistory);
router.use("/statistics", statistics);
// Optional health check route
router.get("/", (req, res) => {
  res.send("📡 API index route active");
});

module.exports = router;
