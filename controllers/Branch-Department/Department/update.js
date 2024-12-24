const DepartmentValidator = require("../../../validators/BranchDepartmentValidators/DepartmentValidator");
const Department = require("../../../models/Department");

async function update(req, res) {
  try {
    const { departmentId } = req.params;
    const { departmentName, branchId } = req.body;

    const { error } = DepartmentValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const existingDepartment = await Department.findById(departmentId);

    if (!existingDepartment) {
      return res.status(404).json({
        message: "Department not found.",
        hasError: true,
      });
    }

    existingDepartment.departmentName = departmentName;
    existingDepartment.branchId = branchId;

    await existingDepartment.save();

    return res.status(200).json({
      message: "Department updated successfully!",
      department: existingDepartment,
    });
  } catch (error) {
    console.error("Error updating department:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "A department with the same name already exists in this branch.",
        hasError: true,
      });
    }

    return res.status(500).json({
      message: "Failed to update department.",
      error: error.message,
    });
  }
}

module.exports = update;
