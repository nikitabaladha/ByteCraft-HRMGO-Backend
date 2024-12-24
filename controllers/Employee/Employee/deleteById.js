// controllers/Employee/delete.js
const Employee = require("../../../models/Employee");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;