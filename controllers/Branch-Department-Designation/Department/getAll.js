const Department = require("../../../models/Department");

async function getAll(req, res) {
  try {
    // Fetch all departments and populate the branchId to include branchName
    const departments = await Department.find()
      .populate({
        path: "branchId",
        select: "branchName",
      })
      .select("departmentName branchId");

    if (departments.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No departments found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Departments fetched successfully",
      data: departments.map((department) => ({
        id: department._id,
        departmentName: department.departmentName,
        branchId: department.branchId._id,
        branchName: department.branchId.branchName,
      })),
    });
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
