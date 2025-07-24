const express = require("express");
const router = express.Router();
const {
  createSlot,
  getAllSlots,
  updateCarDetails,
  releaseSlot,
  filterSlots,
} = require("../controller/slots.controller");

/**
 * @swagger
 * tags:
 *   name: Slots
 *   description: Slot management
 */

/**
 * @swagger
 * /slots:
 *   post:
 *     summary: Create a new slot
 *     tags: [Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slotType:
 *                 type: string
 *               status:
 *                 type: string
 *               position:
 *                 type: object
 *                 properties:
 *                   longitude:
 *                     type: number
 *                   latitude:
 *                     type: number
 *               parkingArea:
 *                 type: string
 *               discountPrice:
 *                 type: number
 *               discountPercentage:
 *                 type: number
 *               rate:
 *                 type: number
 *     responses:
 *       201:
 *         description: Slot created
 */
router.post("/", createSlot);

/**
 * @swagger
 * /slots:
 *   get:
 *     summary: Get all slots
 *     tags: [Slots]
 *     responses:
 *       200:
 *         description: List of slots
 */
router.get("/", getAllSlots);

/**
 * @swagger
 * /slots/{id}/car-details:
 *   put:
 *     summary: Update car details and mark slot as Occupied
 *     tags: [Slots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverName:
 *                 type: string
 *               driverPhone:
 *                 type: string
 *               carType:
 *                 type: string
 *               carColor:
 *                 type: string
 *               licencePlateNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Car details updated
 */
router.put("/:id/car-details", updateCarDetails);

/**
 * @swagger
 * /slots/{id}/release:
 *   put:
 *     summary: Release a slot (clear car details and mark as Available)
 *     tags: [Slots]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Slot ID
 *     responses:
 *       200:
 *         description: Slot released
 */
router.put("/:id/release", releaseSlot);

/**
 * @swagger
 * /slots/filter:
 *   get:
 *     summary: Get slots based on filters
 *     tags: [Slots]
 *     parameters:
 *       - name: slotType
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by slot type (e.g., Electric)
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by status (e.g., Available)
 *       - name: parkingType
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by parking type (e.g., Mall Parking)
 *     responses:
 *       200:
 *         description: Filtered slot list
 */
router.get("/filter", filterSlots); // 👈 new filter route

module.exports = router;
