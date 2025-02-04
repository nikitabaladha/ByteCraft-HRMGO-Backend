const DocumentType = require("../../../models/DocumentType");

async function deleteDocumentType(req, res) {
  const { id } = req.params;

  try {
    const deletedDocumentType = await DocumentType.findByIdAndDelete(id);

    if (!deletedDocumentType) {
      return res.status(404).json({
        message: 'Document Type not found',
      });
    }

    res.status(200).json({
      message: 'Document Type deleted successfully',
      data: deletedDocumentType,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the document type',
      error: error.message,
    });
  }
}

module.exports = deleteDocumentType;
