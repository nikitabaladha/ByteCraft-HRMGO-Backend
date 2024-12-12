const ContractAttachment = require("../../../models/ContractAttachment");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const Attachment = await ContractAttachment.findById(id);
    if (!Attachment) {
      return res.status(404).json({
        success: false,
        message: "Contract Attachment not found.",
      });
    }

    await ContractAttachment.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contract Attachment deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting contract Attachment:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete contract Attachment.",
      error: error.message,
    });
  }
}

module.exports = deleteById;
