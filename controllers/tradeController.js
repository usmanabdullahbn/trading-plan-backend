const Trade = require("../models/Trade");

// @desc Create new trade
// @route POST /api/trades/new
const createTrade = async (req, res) => {
  try {
    const trade = await Trade.create({ ...req.body });
    return res.status(201).json({
      success: true,
      message: "Trade created successfully",
      trade,
    });
  } catch (error) {
    console.error("Create Trade Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create trade",
      error: error.message,
    });
  }
};

// ✅ Get all trades (optionally filter by userId)
// @route GET /api/trades/all or /api/trades/all:userId=123
const getAllTrades = async (req, res) => {
  try {
    const { userId } = req.params;

    let trades;
    if (userId) {
      trades = await Trade.find({ userId: userId }).sort({ createdAt: -1 });
    } else {
      trades = await Trade.find().sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      count: trades.length,
      trades,
    });
  } catch (error) {
    console.error("Get All Trades Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trades",
      error: error.message,
    });
  }
};

// ✅ Get a single trade by ID
// @route GET /api/trades/:id
const getTrade = async (req, res) => {
  try {
    const { id } = req.params;

    const trade = await Trade.findById(id);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    return res.status(200).json({
      success: true,
      trade,
    });
  } catch (error) {
    console.error("Get Trade Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trade",
      error: error.message,
    });
  }
};


// @desc Update a trade
// @route PUT /api/trades/:id
const updateTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrade = await Trade.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trade updated successfully",
      trade: updatedTrade,
    });
  } catch (error) {
    console.error("Update Trade Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update trade",
      error: error.message,
    });
  }
};

// @desc Close a trade (mark as completed & calculate profit/loss if provided)
// @route PUT /api/trades/:id/close
const closeTrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { outcome, profitLoss,remarks } = req.body;

    const trade = await Trade.findById(id);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    trade.status = "completed";
    trade.outcome = outcome || "pending";
    trade.profitLoss = profitLoss || 0;
    trade.remarks = remarks || ""

    await trade.save();

    return res.status(200).json({
      success: true,
      message: "Trade closed successfully",
      trade,
    });
  } catch (error) {
    console.error("Close Trade Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to close trade",
      error: error.message,
    });
  }
};

// @desc Delete a trade
// @route DELETE /api/trades/:id
const deleteTrade = async (req, res) => {
  try {
    const { id } = req.params;

    const trade = await Trade.findByIdAndDelete(id);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trade deleted successfully",
    });
  } catch (error) {
    console.error("Delete Trade Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete trade",
      error: error.message,
    });
  }
};

module.exports = {
  createTrade,
  getAllTrades,  // ✅ new function
  getTrade,      // ✅ single trade
  updateTrade,
  closeTrade,
  deleteTrade,
};
