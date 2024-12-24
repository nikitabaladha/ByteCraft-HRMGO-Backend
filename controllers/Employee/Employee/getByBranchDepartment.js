const Employee = require("../../../models/Employee");

async function getByBranchDepartment(req, res) {
  const { branchId, departmentId } = req.query;

  try {
    if (!branchId || !departmentId) {
      return res.status(400).json({
        hasError: true,
        message: "Both branchId and departmentId are required",
      });
    }

    const employees = await Employee.find({ branchId, departmentId });

    if (employees.length === 0) {
      return res.status(404).json({
        hasError: false,
        message: "No employees found for the given branch and department",
      });
    }

    return res.status(200).json({
      hasError: false,
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
}

module.exports = getByBranchDepartment;