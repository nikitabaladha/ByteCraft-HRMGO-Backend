const Branch = require("../../../models/Branch");

async function getBranchById(req, res) {
  try {
    const { id } = req.params;

    const branch = await Branch.findById(id);

    if (!branch) {
      return res.status(404).json({
        hasError: true,
        message: "Branch not found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Branch fetched successfully",
      data: branch,
    });
  } catch (error) {
    console.error("Error fetching branch by ID:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getBranchById;
