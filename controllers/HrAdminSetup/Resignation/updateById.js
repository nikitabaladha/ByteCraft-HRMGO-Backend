const Resignation = require("../../../models/Resignation");
const ResignationValidator = require("../../../validators/HrAdminSetupValidators/Resignation.js");

async function updateById(req, res) {
  try {
    const { id } = req.params;

    const { error } = ResignationValidator.ResignationUpdateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        hasError: true,
        message: errorMessages,
      });
    }

    const { resignationDate, lastWorkingDay, reason } = req.body;

    const resignation = await Resignation.findById(id);

    if (!resignation) {
      return res.status(404).json({
        hasError: true,
        message: "Resignation not found",
      });
    }

    resignation.resignationDate =
      resignationDate || resignation.resignationDate;
    resignation.lastWorkingDay = lastWorkingDay || resignation.lastWorkingDay;
    resignation.reason = reason || resignation.reason;

    const updatedResignation = await resignation.save();

    return res.status(200).json({
      hasError: false,
      message: "Resignation updated successfully",
      data: updatedResignation,
    });
  } catch (error) {
    console.error("Error updating resignation:", error.message);

    return res.status(500).json({
      hasError: true,
      message: "Server error. Please try again later.",
    });
  }
}

module.exports = updateById;
