const Warning = require("../../../models/Warning");
const WarningValidator = require("../../../validators/HrAdminSetupValidators/Warning.js");

async function create(req, res) {
  try {
    const { error } = WarningValidator.WarningCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const { warningById, warningToId, subject, warningDate, description } =
      req.body;

    const existingWarning = await Warning.findOne({
      warningById,
      warningToId,
      warningDate,
    });

    if (existingWarning) {
      return res.status(400).json({
        hasError: true,
        message: "Warning already exists for this employee",
      });
    }

    const newWarning = new Warning({
      warningById,
      warningToId,
      subject,
      warningDate,
      description,
    });

    await newWarning.save();

    return res.status(201).json({
      hasError: false,
      message: "Warning created successfully",
      data: newWarning,
    });
  } catch (error) {
    console.error("Error creating Warning:", error);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = create;
