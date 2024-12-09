const ContractComment = require("../../../models/ContractComment");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    // Check if the ContractComment exists
    const comment = await ContractComment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Contract Comment not found.",
      });
    }

    // Delete the ContractComment
    await ContractComment.findByIdAndDelete(id);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Contract Comment deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting contract comment:", error.message);

    // Handle server error
    return res.status(500).json({
      success: false,
      message: "Failed to delete contract comment.",
      error: error.message,
    });
  }
}

module.exports = deleteById;
