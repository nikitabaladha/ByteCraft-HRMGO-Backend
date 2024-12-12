const DashboardMetric = require("../../../models/DashboardMetric");

async function getById(req, res) {
  try {
    const { id } = req.params;

    const metric = await DashboardMetric.findById(id);

    if (!metric) {
      return res.status(404).json({ message: "Dashboard metric not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Dashboard metric retrieved successfully",
      data: metric,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = getById;
