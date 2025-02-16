const Award = require("../../../models/Award");
const AwardValidator = require("../../../validators/HrAdminSetupValidators/Award.js");
const mongoose = require("mongoose");

async function updateById(req, res) {
  try {
    const { id } = req.params;

    // Validate the request body
    const { error } = AwardValidator.AwardUpdateValidator.validate(req.body);
    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    // Find the existing award
    const existingAward = await Award.findById(id);
    if (!existingAward) {
      return res.status(404).json({ message: "Award not found" });
    }

    // Prepare the update object
    const updateData = {
      awardTypeId: req.body.awardTypeId || existingAward.awardTypeId,
      date: req.body.date || existingAward.date,
      gift: req.body.gift || existingAward.gift,
      description: req.body.description || existingAward.description,
    };

    // Validate awardTypeId if provided
    if (
      req.body.awardTypeId &&
      !mongoose.Types.ObjectId.isValid(req.body.awardTypeId)
    ) {
      return res.status(400).json({ message: "Invalid awardTypeId" });
    }

    // Update the award
    const updatedAward = await Award.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      hasError: false,
      message: "Award updated successfully",
      data: updatedAward,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = updateById;
