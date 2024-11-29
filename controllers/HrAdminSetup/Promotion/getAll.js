// controllers/Promotion/getAll.js
const { trusted } = require("mongoose");
const Promotion = require("../../../models/Promotion");

async function getAll(req, res) {
  try {
    const promotions = await Promotion.find()
      .populate("employeeId", "name")
      .populate("designationId", "designationName");

    if (!promotions.length) {
      return res.status(404).json({
        hasError: true,
        message: "No Promotions found",
        data: [],
      });
    }

    const formedPromotions = promotions.map((promotion) => ({
      employeeName: promotion.employeeId?.name || "Unknown",
      designationName: promotion.designationId?.designationName || "Unknown",
      promotionTitle: promotion.promotionTitle,
      promotionDate: promotion.promotionDate,
      description: promotion.description,
      id: promotion._id,
      designationId: promotion.designationId._id,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Promotions retrieved successfully",
      data: formedPromotions,
    });
  } catch (error) {
    console.error("Error in getAll API:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = getAll;
