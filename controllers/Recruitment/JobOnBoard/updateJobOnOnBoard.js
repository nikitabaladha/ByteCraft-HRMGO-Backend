const JobOnboard = require("../../../models/AddToJobOnboard");

const updateJobOnboarding = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    const requiredFields = [
      "joining_date",
      "days_of_week",
      "salary",
      "salary_type",
      "salary_duration",
      "job_type",
      "status",
    ];

    const missingFields = requiredFields.filter(
      (field) => updates[field] === undefined
    );

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ error: `Missing required fields: ${missingFields.join(", ")}` });
    }

    const updatedJobOnboarding = await JobOnboard.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } 
    );

    if (!updatedJobOnboarding) {
      return res
        .status(404)
        .json({ error: "Job onboarding not found with the given ID." });
    }

    res.status(200).json({
      message: "Job onboarding updated successfully.",
      jobOnboarding: updatedJobOnboarding,
    });
  } catch (error) {
    console.error("Error updating job onboarding:", error);
    res.status(500).json({ error: "Failed to update job onboarding." });
  }
};

module.exports = updateJobOnboarding;
