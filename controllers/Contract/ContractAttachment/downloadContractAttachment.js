const path = require("path");
const fs = require("fs");
const ContractAttachment = require("../../../models/ContractAttachment");

const downloadContractAttachment = async (req, res) => {
  try {
    const attachment = await ContractAttachment.findById(req.params.id);
    if (!attachment) {
      return res
        .status(404)
        .json({ hasError: true, message: "Attachment not found." });
    }

    const attachmentUrl = attachment.contractAttachmentUrl.replace(/^\/+/, "");
    const fileName = path.basename(attachment.contractAttachmentUrl);
    const filePath = path.join(
      __dirname,
      "../../../Images/contractAttachmentImages",
      path.basename(attachmentUrl)
    );

    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ hasError: true, message: "File not found." });
    }

    // Set the content type based on the file extension
    const ext = path.extname(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString("base64");

    const contentType =
      ext === ".jpg"
        ? "image/jpeg"
        : ext === ".png"
        ? "image/png"
        : "application/octet-stream";

    console.log(attachment);

    return res.json({
      hasError: false,
      message: "File retrieved successfully",
      data: `data:${contentType};base64,${base64Data}`,
      fileName,
    });
  } catch (error) {
    console.error("Error fetching attachment for download:", error.message);
    return res
      .status(500)
      .json({ hasError: true, message: "Failed to download attachment." });
  }
};

module.exports = downloadContractAttachment;
