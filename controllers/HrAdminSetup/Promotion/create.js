// controllers/Promotion/create.js
const Promotion = require("../../../models/Promotion");

const PromotionValidator = require("../../../validators/HrAdminSetupValidators/Promotion.js");

async function create(req, res) {
  try {
    const {
      employeeId,
      designationId,
      promotionTitle,
      promotionDate,
      description,
    } = req.body;

    // Validate the Promotion data using Joi schema
    const { error } = PromotionValidator.PromotionCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const existingPromotion = await Promotion.findOne({
      employeeId,
      designationId,
      promotionDate,
    });

    if (existingPromotion) {
      return res.status(400).json({
        hasError: true,
        message:
          "Promotion already exists for this employee and designation on this date.",
      });
    }

    // Create a new Promotion
    const newPromotion = new Promotion({
      employeeId,
      designationId,
      promotionTitle,
      promotionDate,
      description,
    });

    await newPromotion.save();

    return res.status(201).json({
      hasError: false,
      message: "Promotion created successfully",
      data: newPromotion,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
