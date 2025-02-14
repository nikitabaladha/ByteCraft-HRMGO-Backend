const Employee = require("../../../models/Employee");
const mongoose = require("mongoose");

async function getEmployeeById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid employee ID format.",
      });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    return res.status(200).json({
      employeeName: employee.name,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({
      message: "Failed to fetch employee.",
      error: error.message,
    });
  }
}

module.exports =  getEmployeeById ;
