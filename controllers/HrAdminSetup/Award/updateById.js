// controllers/Award/update.js
const Award = require("../../../models/Award");
const AwardValidator = require("../../../validators/HrAdminSetupValidators/Award.js");

async function updateById(req, res) {
  try {
    const { id } = req.params;
    const { awardType, date, gift, description } = req.body;

    const { error } = AwardValidator.AwardUpdateValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const award = await Award.findById(id);
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }

    award.awardType = awardType || award.awardType;
    award.date = date || award.date;
    award.gift = gift || award.gift;
    award.description = description || award.description;

    await award.save();

    return res.status(200).json({
      hasError: false,
      message: "Award updated successfully",
      data: award,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = updateById;
