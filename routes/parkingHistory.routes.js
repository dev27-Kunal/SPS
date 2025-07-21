// routes/history.routes.js

const express = require("express");
const router = express.Router();
const { getParkingHistory } = require("../controller/parkingHistory.controller");

/**
 * @swagger
 * tags:
 *   name: Parking History
 *   description: Parking history management
 */

/**
 * @swagger
 * /parking-history:
 *   get:
 *     summary: Get all parking history
 *     tags: [Parking History]
 *     responses:
 *       200:
 *         description: List of parking history records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       slotId:
 *                         type: object
 *                         description: Slot details
 *                       entryTime:
 *                         type: string
 *                         format: date-time
 *                       exitTime:
 *                         type: string
 *                         format: date-time
 *                       duration:
 *                         type: number
 *                       cost:
 *                         type: number
 *                       payStatus:
 *                         type: string
 */

router.get("/", getParkingHistory);

module.exports = router;
