const JobOnboard = require("../../../models/AddToJobOnboard");

const getJobOnboardingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Job onboarding ID is required." });
    }

    const jobOnboarding = await JobOnboard.findById(id);

    if (!jobOnboarding) {
      return res.status(404).json({ error: "Job onboarding not found." });
    }

    res.status(200).json({
      message: "Job onboarding retrieved successfully.",
      jobOnboarding,
    });
  } catch (error) {
    console.error("Error retrieving job onboarding by ID:", error);
    res.status(500).json({ error: "Failed to retrieve job onboarding." });
  }
};

module.exports = getJobOnboardingById;
