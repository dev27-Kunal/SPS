const express = require("express");
const router = express.Router();
const { createParkingArea, getAllParkingAreas, getParkingAreaById } = require("../controller/parkingArea.controller");

// POST /api/parking-areas

/**
 * @swagger
 * tags:
 *   name: Parking Areas
 *   description: APIs for managing parking areas
 */

/**
 * @swagger
 * /parking-areas:
 *   post:
 *     summary: Create a new parking area
 *     tags: [Parking Areas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - areaName
 *             properties:
 *               areaName:
 *                 type: string
 *                 example: "Downtown Parking Zone A"
 *               geometry:
 *                 type: object
 *                 example:
 *                   type: Polygon
 *                   coordinates: [[[80.222, 12.971], [80.223, 12.972], [80.224, 12.973], [80.222, 12.971]]]
 *     responses:
 *       201:
 *         description: Parking area created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

router.post("/", createParkingArea);

/**
 * @swagger
 * /parking-areas:
 *   get:
 *     summary: Get all parking areas
 *     tags: [Parking Areas]
 *     responses:
 *       200:
 *         description: A list of parking areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   areaName:
 *                     type: string
 *                   geometry:
 *                     type: object
 *       500:
 *         description: Server error
 */

router.get("/", getAllParkingAreas);

/**
 * @swagger
 * /parking-areas/{id}:
 *   get:
 *     summary: Get a parking area by ID
 *     tags: [Parking Areas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Parking area ID
 *     responses:
 *       200:
 *         description: Parking area data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 areaName:
 *                   type: string
 *                 geometry:
 *                   type: object
 *       404:
 *         description: Parking area not found
 *       500:
 *         description: Server error
 */

router.get("/:id", getParkingAreaById);

module.exports = router;
