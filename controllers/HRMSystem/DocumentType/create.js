const DocumentType = require("../../../models/DocumentType");

async function create(req, res) {
  try {
    const { documentType, isRequired } = req.body;

    if (!documentType || !isRequired) {
      return res.status(400).json({ message: "Document Type and Required Field are both required." });
    }

    const newDocumentType = new DocumentType({
      documentType,
      isRequired,
    });

    await newDocumentType.save();

    return res.status(201).json({
      message: "Document Type created successfully!",
      documentType: newDocumentType,
    });
  } catch (error) {
    console.error("Error creating document type:", error);
    return res.status(500).json({
      message: "Failed to create document type.",
      error: error.message,
    });
  }
}

module.exports = create;
