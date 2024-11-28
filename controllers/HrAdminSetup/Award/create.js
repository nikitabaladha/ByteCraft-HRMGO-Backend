// controllers/Award/create.js
const Award = require("../../../models/Award");

const AwardValidator = require("../../../validators/HrAdminSetupValidators/Award.js");

async function create(req, res) {
  try {
    const { employeeId, awardType, date, gift, description } = req.body;

    // Validate the Award data using Joi schema
    const { error } = AwardValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    // Create a new Award
    const newAward = new Award({
      employeeId,
      awardType,
      date,
      gift,
      description,
    });

    // Save the Award to the database
    await newAward.save();

    return res.status(201).json({
      hasError: false,
      message: "Award created successfully",
      data: newAward,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
