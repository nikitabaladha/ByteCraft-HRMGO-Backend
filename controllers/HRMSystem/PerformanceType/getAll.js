const PerformanceType = require("../../../models/PerformanceType");

async function getAll(req, res) {
  try {
    const performanceTypes = await PerformanceType.find();

    if (performanceTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Performance Types found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Performance Types fetched successfully",
      data: performanceTypes,
    });
  } catch (error) {
    console.error("Error fetching performance types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
