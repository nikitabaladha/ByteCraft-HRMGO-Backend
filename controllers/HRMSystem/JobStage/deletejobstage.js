const JobStage = require("../../../models/JobStage");

async function deleteJobStage(req, res) {
  const { id } = req.params;

  try {
    const deletedJobStage = await JobStage.findByIdAndDelete(id);

    if (!deletedJobStage) {
      return res.status(404).json({
        message: 'Job Stage not found',
      });
    }

    res.status(200).json({
      message: 'Job Stage deleted successfully',
      data: deletedJobStage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the job stage',
      error: error.message,
    });
  }
}

module.exports = deleteJobStage;
