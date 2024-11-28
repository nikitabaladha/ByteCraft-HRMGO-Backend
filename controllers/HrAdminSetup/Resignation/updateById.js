const Resignation = require("../../../models/Resignation");
const ResignationValidator = require("../../../validators/HrAdminSetupValidators/Resignation.js");

async function updateById(req, res) {
  try {
    const { id } = req.params; // Extract resignation ID from request parameters
    const { resignationDate, lastWorkingDay, reason } = req.body; // Extract fields to update

    // Validate the request body using the Joi validator
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

    // Find the resignation by ID
    const resignation = await Resignation.findById(id);

    if (!resignation) {
      return res.status(404).json({
        hasError: true,
        message: "Resignation not found",
      });
    }

    // Update fields only if provided
    resignation.resignationDate =
      resignationDate || resignation.resignationDate;
    resignation.lastWorkingDay = lastWorkingDay || resignation.lastWorkingDay;
    resignation.reason = reason || resignation.reason;

    // Save the updated resignation
    const updatedResignation = await resignation.save();

    return res.status(200).json({
      hasError: false,
      message: "Resignation updated successfully",
      data: updatedResignation,
    });
  } catch (error) {
    console.error("Error updating resignation:", error.message);

    // Return a 500 response in case of server error
    return res.status(500).json({
      hasError: true,
      message: "Server error. Please try again later.",
    });
  }
}

module.exports = updateById;
