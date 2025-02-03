const JobCategory = require("../../../models/JobCategory");

async function deleteJobCategory(req, res) {
  const { id } = req.params;

  try {
    const deletedJobCategory = await JobCategory.findByIdAndDelete(id);

    if (!deletedJobCategory) {
      return res.status(404).json({
        message: 'Job Category not found',
      });
    }

    res.status(200).json({
      message: 'Job Category deleted successfully',
      data: deletedJobCategory,
    });
  } catch (error) {
    console.error("Error deleting job category:", error);

    res.status(500).json({
      message: 'An error occurred while deleting the job category',
      error: error.message,
    });
  }
}

module.exports = deleteJobCategory;
