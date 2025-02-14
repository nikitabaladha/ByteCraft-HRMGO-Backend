const Department = require("../../../models/Department");

async function getDepartmentById(req, res) {
  try {
    const { id } = req.params;

    const department = await Department.findById(id).select("departmentName");

    if (!department) {
      return res.status(404).json({
        hasError: true,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Department fetched successfully",
      data: department.departmentName,
    });
  } catch (error) {
    console.error("Error fetching department by ID:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getDepartmentById;
