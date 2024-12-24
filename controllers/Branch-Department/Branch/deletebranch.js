const Branch = require("../../../models/Branch");

async function deleteBranch(req, res) {
  const { id } = req.params;

  try {
    const deletedBranch = await Branch.findByIdAndDelete(id);

    if (!deletedBranch) {
      return res.status(404).json({
        message: 'Branch not found',
      });
    }

    res.status(200).json({
      message: 'Branch deleted successfully',
      data: deletedBranch,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the branch',
      error: error.message,
    });
  }
}

module.exports = deleteBranch;
