const JobOnboard = require("../../../models/AddToJobOnboard");

const getJobOnboardings = async (req, res) => {
  try {
    const { applicantId, status, job_type } = req.query;

    const query = {};
    if (applicantId) query.applicantId = applicantId;
    if (status) query.status = status;
    if (job_type) query.job_type = job_type;

    const jobOnboardings = await JobOnboard.find(query);

    res.status(200).json({
      message: "Job onboardings retrieved successfully.",
      jobOnboardings,
    });
  } catch (error) {
    console.error("Error retrieving job onboardings:", error);
    res.status(500).json({ error: "Failed to retrieve job onboardings." });
  }
};

module.exports = getJobOnboardings;
