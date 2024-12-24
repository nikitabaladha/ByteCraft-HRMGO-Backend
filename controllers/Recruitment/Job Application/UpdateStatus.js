const JobApplication = require("../../../models/JobApplication");

const updateStatus = async (req, res) => {
  const { id } = req.params; 
  const { status, rating } = req.body;

  try {
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      id,
      {
        status,
        rating,
      },
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Job Application not found" });
    }

    res.status(200).json({ message: "Job Application updated successfully", updatedApplication });
  } catch (error) {
    res.status(500).json({ message: "Error updating job application", error: error.message });
  }
};

module.exports =  updateStatus ;
