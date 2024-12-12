const ContractAttachment = require("../../../models/ContractAttachment");
const path = require("path");
async function getByContractId(req, res) {
  try {
    const { contractId } = req.query;

    if (!contractId) {
      return res.status(400).json({
        hasError: true,
        message: "Contract ID is required.",
      });
    }

    const contractAttachments = await ContractAttachment.find({ contractId })
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "firstName lastName",
      });

    if (!contractAttachments || contractAttachments.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Contract Attachments found for the specified contract ID.",
      });
    }

    const attachments = contractAttachments.map((attachment) => {
      const fileName = path.basename(attachment.contractAttachmentUrl);
      return {
        id: attachment._id,
        userName: `${attachment.userId.firstName} ${attachment.userId.lastName}`,
        userId: attachment.userId._id,
        contractId: attachment.contractId,
        contractAttachmentUrl: attachment.contractAttachmentUrl,
        fileName: fileName,
        fileSize: `${attachment.fileSize} MB`,
        createdAt: attachment.createdAt,
        updatedAt: attachment.updatedAt,
      };
    });

    return res.status(200).json({
      hasError: false,
      message: "Contract attachments fetched successfully!",
      data: attachments,
    });
  } catch (error) {
    console.error("Error fetching contract attachments:", error.message);

    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch contract attachments.",
      error: error.message,
    });
  }
}

module.exports = getByContractId;
