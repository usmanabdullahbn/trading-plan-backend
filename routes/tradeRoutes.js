const express = require("express");
const {
  createTrade,
  getTrade,
  getAllTrades,
  updateTrade,
  closeTrade,
  deleteTrade,
} = require("../controllers/tradeController");

// const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// All trade routes require authentication
// router.use(authMiddleware);

// @route POST /api/trades
// @desc  Create new trade
router.post("/new", createTrade);

// @route GET /api/trades
// @desc  Get all trades for logged-in user
router.get("/all:userId", getAllTrades);

// get signal Trade
router.get("/:id", getTrade);

// @route PUT /api/trades/:id
// @desc  Edit a trade
router.put("/:id", updateTrade);

// @route PUT /api/trades/:id/close
// @desc  Close a trade
router.put("/:id/close", closeTrade);

// @route DELETE /api/trades/:id
// @desc  Delete a trade
router.delete("/:id", deleteTrade);

module.exports = router;
