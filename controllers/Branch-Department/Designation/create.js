const DesignationValidator = require("../../../validators/BranchDepartmentValidators/DesignationValidator");
const Designation = require("../../../models/Designation");

async function create(req, res) {
  try {
    const { error } = DesignationValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { designationName, departmentId } = req.body;

    const newDesignation = new Designation({
      designationName,
      departmentId,
    });

    await newDesignation.save();

    return res.status(201).json({
      message: "Designation created successfully!",
      data: newDesignation,
    });
  } catch (error) {
    console.error("Error creating designation:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "A designation with the same name already exists in this branch.",
        hasError: true,
      });
    }

    return res.status(500).json({
      message: "Failed to create designation.",
      error: error.message,
    });
  }
}

module.exports = create;