const Promotion = require("../../../models/Promotion");
const PromotionValidator = require("../../../validators/HrAdminSetupValidators/Promotion.js");

async function updateById(req, res) {
  try {
    const { id } = req.params;

    const { error } = PromotionValidator.PromotionUpdateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        hasError: true,
        message: errorMessages,
      });
    }

    const { designationId, promotionTitle, promotionDate, description } =
      req.body;

    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({
        hasError: true,
        message: "Promotion not found",
      });
    }

    promotion.promotionTitle = promotionTitle || promotion.promotionTitle;
    promotion.promotionDate = promotionDate || promotion.promotionDate;
    promotion.designationId = designationId || promotion.designationId;
    promotion.description = description || promotion.description;

    await promotion.save();

    return res.status(200).json({
      hasError: false,
      message: "Promotion updated successfully",
      data: promotion,
    });
  } catch (error) {
    console.error("Error updating promotion:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = updateById;
