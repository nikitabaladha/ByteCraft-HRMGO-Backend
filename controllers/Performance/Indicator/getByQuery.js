const Indicator = require("../../../models/Indicator");

async function getByQuery(req, res) {
  try {
    // Destructure the query parameters
    const { branchId, departmentId, designationId, createdAt } = req.query;

    // Validate required query parameters
    if (!branchId || !departmentId || !designationId || !createdAt) {
      return res.status(400).json({
        message:
          "All query parameters are required (branchId, departmentId, designationId, createdAt)",
      });
    }

    // Parse the createdAt parameter for month and year
    const [year, month] = createdAt.split("-").map(Number);
    if (!year || !month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ message: "Invalid createdAt format. Use YYYY-MM." });
    }

    // Construct the date range for the specified month and year
    const startDate = new Date(Date.UTC(year, month - 1, 1)); // First day of the month
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)); // Last day of the month

    // Find the indicator matching the query
    const indicator = await Indicator.findOne({
      branchId,
      departmentId,
      designationId,
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .select("competencies _id") // Only select competencies and _id
      .populate("branchId", "name") // Populate branchId with only its name field
      .populate("departmentId", "name") // Populate departmentId with only its name field
      .populate("designationId", "name") // Populate designationId with only its name field
      .populate("addedById", "fullName email"); // Populate addedById with fullName and email fields

    // If no indicator is found, return a 404 error
    if (!indicator) {
      return res.status(404).json({
        message: "Indicator not found for the provided criteria",
      });
    }

    // Return the found indicator, only the required fields
    res.status(200).json({
      message: "Indicator fetched successfully",
      data: {
        competencies: indicator.competencies, // Return only competencies
        _id: indicator._id, // Return only _id
      },
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = getByQuery;
