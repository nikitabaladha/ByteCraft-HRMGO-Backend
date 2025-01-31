const BranchValidator = require("../../../validators/BranchDepartmentValidators/BranchValidator");
const Branch = require("../../../models/Branch");

// Create branch logic
async function create(req, res) {
  try {
    const { error } = BranchValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { branchName } = req.body;

    const newBranch = new Branch({
      branchName,
    });

    await newBranch.save();

    return res.status(201).json({
      message: "Branch created successfully!",
      data: newBranch,
    });
  } catch (error) {
    console.error("Error creating branch:", error);
    return res.status(500).json({
      message: "Failed to create branch.",
      error: error.message,
    });
  }
}

module.exports = create;