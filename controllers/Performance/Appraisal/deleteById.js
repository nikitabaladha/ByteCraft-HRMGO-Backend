const Appraisal = require("../../../models/Appraisal");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    // Find and delete the appraisal by its ID
    const appraisal = await Appraisal.findByIdAndDelete(id);

    if (!appraisal) {
      return res.status(404).json({ message: "Appraisal not found" });
    }

    return res.status(200).json({
      message: "Appraisal deleted successfully!",
      data: {
        id: appraisal._id,
      },
    });
  } catch (error) {
    console.error("Error deleting appraisal:", error);
    return res.status(500).json({
      message: "Failed to delete appraisal.",
      error: error.message,
    });
  }
}

module.exports = deleteById;
