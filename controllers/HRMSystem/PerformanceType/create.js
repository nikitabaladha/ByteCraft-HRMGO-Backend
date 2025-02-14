const PerformanceType = require("../../../models/PerformanceType");

async function create(req, res) {
  try {
    const { performanceName } = req.body;

    if (!performanceName) {
      return res.status(400).json({ message: "Performance Type Name is required." });
    }

    const newPerformanceType = new PerformanceType({
      performanceName,
    });

    await newPerformanceType.save();

    return res.status(201).json({
      message: "Performance Type created successfully!",
      performanceType: newPerformanceType,
    });
  } catch (error) {
    console.error("Error creating performance type:", error);
    return res.status(500).json({
      message: "Failed to create performance type.",
      error: error.message,
    });
  }
}

module.exports = create;
