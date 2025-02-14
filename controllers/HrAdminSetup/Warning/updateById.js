const Warning = require("../../../models/Warning");
const WarningValidator = require("../../../validators/HrAdminSetupValidators/Warning.js");

async function updateById(req, res) {
  try {
    const { id } = req.params;

    const { error } = WarningValidator.WarningUpdateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { warningToId, subject, warningDate, description } = req.body;

    const warning = await Warning.findById(id);

    if (!warning) {
      return res.status(404).json({
        hasError: true,
        message: "Warning not found",
      });
    }

    warning.warningToId = warningToId || warning.warningToId;
    warning.subject = subject || warning.subject;
    warning.warningDate = warningDate || warning.warningDate;
    warning.description = description || warning.description;

    const updatedWarning = await warning.save();

    return res.status(200).json({
      hasError: false,
      message: "Warning updated successfully",
      data: updatedWarning,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = updateById;
