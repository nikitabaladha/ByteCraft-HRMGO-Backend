const PerformanceValidator = require("../../validators/PerformanceValidators/PerformanceValidator");
const Performance = require("../../models/Performance");
const User = require("../../models/User");

async function create(req, res) {
  try {
    // Validate request body using the PerformanceValidator
    const { error } = PerformanceValidator.validate(req.body);

    // If validation fails, return the error messages
    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages, hasError: true });
    }

    // Extract data from the request body
    const {
      employeeId,
      addedById,
      overAllRating,
      targetRating,
      createdAt,
      appraisalDate,
      remark,
    } = req.body;

    // Check if the addedById has 'admin' role
    const addedByUser = await User.findById(addedById);

    if (!addedByUser || addedByUser.role !== "admin") {
      return res.status(403).json({
        message: "You must be an admin to create a performance record.",
        hasError: true,
      });
    }

    // Check if performance for the same employee and appraisal date already exists
    const existingPerformance = await Performance.findOne({
      employeeId,
      appraisalDate,
    });

    if (existingPerformance) {
      return res.status(400).json({
        message:
          "Performance record already exists for this employee for this appraisal date.",
        hasError: true,
      });
    }

    // Create a new performance record
    const newPerformance = new Performance({
      employeeId,
      addedById,
      overAllRating,
      targetRating,
      createdAt,
      appraisalDate,
      remark,
    });

    // Save the new performance record to the database
    await newPerformance.save();

    return res.status(201).json({
      message: "Performance created successfully!",
      performance: newPerformance,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating performance:", error);
    return res.status(500).json({
      message: "Failed to create performance record.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = create;
