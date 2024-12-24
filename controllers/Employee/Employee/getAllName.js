const Employee = require("../../../models/Employee");

async function getAllName(req, res) {
  try {
    const employees = await Employee.find({}, "name");

    return res.status(200).json({
      message: "Employee names retrieved successfully!",
      data: employees,
      hasError: false,
    });
  } catch (error) {
    console.error("Error retrieving employee names:", error);
    return res.status(500).json({
      message: "Failed to retrieve employee names.",
      error: error.message,
    });
  }
}

module.exports = getAllName;