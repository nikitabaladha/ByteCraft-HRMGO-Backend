const JobApplication = require("../../../models/JobApplication"); // Adjust the path as per your project structure

const updateNotes = async (req, res) => {
  try {
    const { id } = req.params; // Extract job application ID from request parameters
    const { Notes } = req.body; // Extract Notes from request body

    // Validate Notes length
    if (Notes && Notes.length > 500) {
      return res.status(400).json({ error: "Notes cannot exceed 500 characters." });
    }

    // Find and update the job application
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      id,
      { Notes },
      { new: true, runValidators: true } // Returns the updated document and applies validators
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Job application not found." });
    }

    res.status(200).json({
      message: "Job application updated successfully.",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating job application:", error);
    res.status(500).json({ error: "An error occurred while updating the job application." });
  }
};

module.exports = updateNotes;
