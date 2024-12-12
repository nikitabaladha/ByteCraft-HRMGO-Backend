const mongoose = require("mongoose");
const Promotion = require("../../../models/Promotion");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        hasError: true,
        message: "Invalid Promotion ID format",
      });
    }

    const promotion = await Promotion.findByIdAndDelete(id);

    if (!promotion) {
      return res.status(404).json({
        hasError: true,
        message: "Promotion not found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Promotion deleted successfully",
      data: promotion,
    });
  } catch (error) {
    console.error("Error deleting promotion:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = deleteById;
