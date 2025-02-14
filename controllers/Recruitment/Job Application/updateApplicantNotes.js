const JobApplication = require("../../../models/JobApplication");

const updateNotes = async (req, res) => {
  try {
    const { id } = req.params; 
    const { Notes } = req.body; 

    if (Notes && Notes.length > 500) {
      return res.status(400).json({ error: "Notes cannot exceed 500 characters." });
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(
      id,
      { Notes },
      { new: true, runValidators: true } 
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
