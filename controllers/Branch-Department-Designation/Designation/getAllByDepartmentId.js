const Designation = require("../../../models/Designation");

async function getAllByDepartmentId(req, res) {
  const { departmentId } = req.query;

  try {
    if (!departmentId) {
      return res
        .status(400)
        .json({ hasError: true, message: "Department ID is required" });
    }

    const designations = await Designation.find({ departmentId });

    if (designations.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No designations found for the provided department ID",
      });
    }

    return res.status(200).json({
      hasError: false,
      data: designations,
    });
  } catch (error) {
    console.error("Error fetching designations:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch designations",
      error: error.message,
    });
  }
}

module.exports = getAllByDepartmentId;
