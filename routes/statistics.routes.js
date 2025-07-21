const express = require("express");
const router = express.Router();
const { getParkingAnalytics } = require("../controller/statistics.controller");

/**
 * @swagger
 * tags:
 *   name: Parking Statistics
 *   description: Retrieve statistics and analytics for parking slots
 */

/**
 * @swagger
 * /statistics:
 *   get:
 *     summary: Get parking statistics
 *     tags: [Parking Statistics]
 *     responses:
 *       200:
 *         description: Parking analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSlots:
 *                   type: integer
 *                   example: 50
 *                 occupancyRate:
 *                   type: string
 *                   example: "40.00%"
 *                 averageParkingTimeInSeconds:
 *                   type: number
 *                   example: 7200
 *                 totalRevenue:
 *                   type: number
 *                   example: 1500
 */
router.get("/", getParkingAnalytics);

module.exports = router;