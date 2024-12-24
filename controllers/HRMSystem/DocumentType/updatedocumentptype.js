const DocumentType = require("../../../models/DocumentType");

async function update(req, res) {
  try {
    const { documentType, isRequired } = req.body;
    const { id } = req.params;

    if (!documentType || !isRequired) {
      return res.status(400).json({ message: "Document Type and Required Field are required." });
    }

    const documentTypeRecord = await DocumentType.findById(id);

    if (!documentTypeRecord) {
      return res.status(404).json({ message: "Document Type not found." });
    }

    documentTypeRecord.documentType = documentType;
    documentTypeRecord.isRequired = isRequired;

    await documentTypeRecord.save();

    return res.status(200).json({
      message: "Document Type updated successfully!",
      documentType: documentTypeRecord,
    });
  } catch (error) {
    console.error("Error updating document type:", error);
    return res.status(500).json({
      message: "Failed to update document type.",
      error: error.message,
    });
  }
}

module.exports = update;
