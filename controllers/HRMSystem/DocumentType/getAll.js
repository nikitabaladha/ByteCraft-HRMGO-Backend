const DocumentType = require("../../../models/DocumentType");

async function getAll(req, res) {
  try {
    const documentTypes = await DocumentType.find();

    if (documentTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Document Type found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Document Types fetched successfully",
      data: documentTypes,
    });
  } catch (error) {
    console.error("Error fetching document types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
