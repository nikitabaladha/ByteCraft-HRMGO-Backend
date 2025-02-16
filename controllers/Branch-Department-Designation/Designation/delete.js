const Designation = require("../../../models/Designation");

async function deleteDesignation(req, res) {
  const { id } = req.params;

  try {
    const deletedDesignation = await Designation.findByIdAndDelete(id);

    if (!deletedDesignation) {
      return res.status(404).json({
        message: "Designation not found",
      });
    }

    res.status(200).json({
      message: "Designation deleted successfully",
      data: deletedDesignation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while deleting the designation",
      error: error.message,
    });
  }
}

module.exports = deleteDesignation;
