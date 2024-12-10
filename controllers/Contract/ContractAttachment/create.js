// ByteCraft-HRMGO-Backend\controllers\Contract\ContractAttachment\create.js

const ContractAttachment = require("../../../models/ContractAttachment");
const path = require("path");

async function create(req, res) {
  try {
    const userId = req.user.id;

    const { contractId } = req.body;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can attach attachment",
      });
    }

    // Ensure files are available
    if (!req.files || !req.files.contractAttachmentUrl) {
      return res.status(400).json({
        hasError: true,
        message: "Contract Attachment is required",
      });
    }

    const contractAttachmentPath = "/contractAttachment/images"; // Path to be stored in DB
    const contractAttachmentUrl = `${contractAttachmentPath}/${req.files.contractAttachmentUrl[0].filename}`; // Build the URL

    const newContractAttachment = await ContractAttachment.create({
      userId,
      contractAttachmentUrl,
      contractId,
    });

    return res.status(201).json({
      hasError: false,
      message: "Contract attachment submitted successfully.",
      data: newContractAttachment,
    });
  } catch (error) {
    console.error("Error during creating Contract attachment:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
