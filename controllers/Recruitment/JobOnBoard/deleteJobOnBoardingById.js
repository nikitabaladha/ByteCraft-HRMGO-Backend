const JobOnboard = require("../../../models/AddToJobOnboard");

const deleteJobOnboarding = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Job onboarding ID is required." });
    }

    const deletedJobOnboarding = await JobOnboard.findByIdAndDelete(id);

    if (!deletedJobOnboarding) {
      return res.status(404).json({ error: "Job onboarding not found." });
    }

    res.status(200).json({
      message: "Job onboarding deleted successfully.",
      jobOnboarding: deletedJobOnboarding,
    });
  } catch (error) {
    console.error("Error deleting job onboarding:", error);
    res.status(500).json({ error: "Failed to delete job onboarding." });
  }
};

module.exports = deleteJobOnboarding;
