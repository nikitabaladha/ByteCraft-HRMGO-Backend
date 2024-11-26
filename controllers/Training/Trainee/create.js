const Branch = require("../../../models/Trainee");
const Employee = require("../../../models/Employee");
const { validateBranch } = require("../validators/branchValidator");

// Controller for creating a new branch
const createBranch = async (req, res) => {
  try {
    // Validate request data
    const { error } = validateBranch(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { employeeId, name, contactNumber, email, expertise, Address } = req.body;

    // Check if employeeId exists in the Employee table
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Create a new Branch
    const branch = new Branch({
      employeeId,
      name,
      contactNumber,
      email,
      expertise,
      Address,
    });

    await branch.save();

    // Populate the branch field from the Employee model
    const branchWithEmployeeDetails = await Branch.findById(branch._id).populate({
      path: "employeeId",
      select: "branch name email", // Include the fields you want from Employee
    });

    res.status(201).json({
      success: true,
      data: branchWithEmployeeDetails,
      message: "Branch created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = { createBranch };
