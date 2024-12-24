const DesignationValidator = require("../../../validators/BranchDepartmentValidators/DesignationValidator");
const Designation = require("../../../models/Designation");

async function update(req, res) {
  try {
    const { error } = DesignationValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { designationName, departmentId, branchId } = req.body;
    const { id } = req.params;

    const updatedDesignation = await Designation.findByIdAndUpdate(
      id,
      {
        designationName,
        departmentId,
        branchId,
      },
      { new: true }
    );

    if (!updatedDesignation) {
      return res.status(404).json({
        message: "Designation not found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      message: "Designation updated successfully!",
      designation: updatedDesignation,
    });
  } catch (error) {
    console.error("Error updating designation:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "A designation with the same name already exists in this department and branch.",
        hasError: true,
      });
    }

    return res.status(500).json({
      message: "Failed to update designation.",
      error: error.message,
    });
  }
}

module.exports = update;
