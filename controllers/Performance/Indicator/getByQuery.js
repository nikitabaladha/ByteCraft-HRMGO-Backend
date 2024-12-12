const Indicator = require("../../../models/Indicator");

async function getByQuery(req, res) {
  try {
    const { branchId, departmentId, designationId, createdAt } = req.query;

    if (!branchId || !departmentId || !designationId || !createdAt) {
      return res.status(400).json({
        message:
          "All query parameters are required (branchId, departmentId, designationId, createdAt)",
      });
    }

    const [year, month] = createdAt.split("-").map(Number);
    if (!year || !month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ message: "Invalid createdAt format. Use YYYY-MM." });
    }

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    const indicator = await Indicator.findOne({
      branchId,
      departmentId,
      designationId,
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .select("competencies _id")
      .populate("branchId", "name")
      .populate("departmentId", "name")
      .populate("designationId", "name")
      .populate("addedById", "fullName email");

    if (!indicator) {
      return res.status(404).json({
        message: "Indicator not found for the provided criteria",
      });
    }

    res.status(200).json({
      message: "Indicator fetched successfully",
      data: {
        competencies: indicator.competencies,
        _id: indicator._id,
      },
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = getByQuery;
