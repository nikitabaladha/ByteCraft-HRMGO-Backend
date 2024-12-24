const PerformanceType = require("../../../models/PerformanceType");

async function update(req, res) {
  try {
    const { performanceName } = req.body; 
    const { id } = req.params;

    const performanceType = await PerformanceType.findById(id);

    if (!performanceType) {
      return res.status(404).json({ message: "Performance Type not found." });
    }

    performanceType.performanceName = performanceName || performanceType.performanceName;

    await performanceType.save();

    return res.status(200).json({
      message: "Performance Type updated successfully!",
      performanceType,
    });
  } catch (error) {
    console.error("Error updating performance type:", error);
    return res.status(500).json({
      message: "Failed to update performance type.",
      error: error.message,
    });
  }
}

module.exports = update;
