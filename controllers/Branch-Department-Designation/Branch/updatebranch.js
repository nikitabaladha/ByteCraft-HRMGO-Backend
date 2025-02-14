const BranchValidator = require("../../../validators/BranchDepartmentValidators/BranchValidator");
const Branch = require("../../../models/Branch");

async function update(req, res) {
  try {
    const { error } = BranchValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { branchName } = req.body;
    const { id } = req.params;

    const branch = await Branch.findById(id);

    if (!branch) {
      return res.status(404).json({ message: "Branch not found." });
    }

    branch.branchName = branchName || branch.branchName;

    await branch.save();

    return res.status(200).json({
      message: "Branch updated successfully!",
      branch,
    });
  } catch (error) {
    console.error("Error updating branch:", error);
    return res.status(500).json({
      message: "Failed to update branch.",
      error: error.message,
    });
  }
}

module.exports = update;
