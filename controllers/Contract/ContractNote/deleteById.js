const ContractNote = require("../../../models/ContractNote");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const Note = await ContractNote.findById(id);

    if (!Note) {
      return res.status(404).json({
        success: false,
        message: "Contract Note not found.",
      });
    }

    await ContractNote.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contract Note deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting contract Note:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete contract Note.",
      error: error.message,
    });
  }
}

module.exports = deleteById;
