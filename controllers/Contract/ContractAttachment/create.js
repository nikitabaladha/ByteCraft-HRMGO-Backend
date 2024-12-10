const ContractAttachment = require("../../../models/ContractAttachment");
const path = require("path");

async function create(req, res) {
  try {
    const userId = req.user.id;
    const { contractId } = req.body;

    // Check if the user is logged in
    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can attach attachments.",
      });
    }

    // Ensure files are available
    if (!req.files || !req.files.contractAttachmentUrl) {
      return res.status(400).json({
        hasError: true,
        message: "Contract Attachment is required.",
      });
    }

    // Update the contractAttachmentPath to match your desired format
    const contractAttachmentPath = "/Images/contractAttachmentImages"; // Updated path
    const contractAttachmentUrl = `${contractAttachmentPath}/${req.files.contractAttachmentUrl[0].filename}`; // Build the URL

    // Get the file size in bytes
    const fileSizeInBytes = req.files.contractAttachmentUrl[0].size; // File size in bytes
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2); // Convert to MB

    // Create the contract attachment record with the file size
    const newContractAttachment = await ContractAttachment.create({
      userId,
      contractAttachmentUrl, // Use the updated URL
      contractId,
      fileSize: fileSizeInMB, // Store the file size in MB
    });

    // Return success response
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
