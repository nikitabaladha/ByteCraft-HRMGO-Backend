const Resignation = require("../../../models/Resignation");
const ResignationValidator = require("../../../validators/HrAdminSetupValidators/Resignation");

async function create(req, res) {
  try {
    const { employeeId, resignationDate, lastWorkingDay, reason } = req.body;

    // Validate the Resignation data using Joi schema
    const { error } = ResignationValidator.ResignationCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    // Create a new Resignation
    const newResignation = new Resignation({
      employeeId,
      resignationDate,
      lastWorkingDay,
      reason,
    });

    await newResignation.save();

    return res.status(201).json({
      hasError: false,
      message: "Resignation created successfully",
      data: newResignation,
    });
  } catch (error) {
    console.error("Error creating resignation:", error.message);

    // Handle duplicate key error (caused by the unique index)
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message:
          "Resignation for this employee on the same date already exists.",
      });
    }

    return res.status(500).json({
      hasError: true,
      message: "Server error. Please try again later.",
    });
  }
}

module.exports = create;
