// controllers/Award/create.js
const Award = require("../../../models/Award");

const AwardValidator = require("../../../validators/HrAdminSetupValidators/Award.js");

async function create(req, res) {
  try {
    const { error } = AwardValidator.AwardCreateValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { employeeId, awardType, date, gift, description } = req.body;

    const newAward = new Award({
      employeeId,
      awardType,
      date,
      gift,
      description,
    });

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
