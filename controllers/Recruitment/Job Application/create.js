const JobApplication = require("../../../models/JobApplication");

// Create a job application
const createJobApplication = async (req, res) => {
  try {
    const {
      jobTitle,
      branch,
      name,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      country,
      zipCode,
      coverLetter,
      customQuestions,
    } = req.body;

    let profile = null;
    let resume = null;

    if (req.files && req.files.profile) {
      const profileImagePath = "/Images/profile";
      profile = `${profileImagePath}/${req.files.profile[0].filename}`;
    }

    if (req.files && req.files.resume) {
      const resumeResumePath = "/Documents/resume";
      resume = `${resumeResumePath}/${req.files.resume[0].filename}`;
    }

    // Create a new job application
    const newApplication = new JobApplication({
      jobTitle,
      branch,
      name,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      country,
      zipCode,
      profile,
      resume,
      coverLetter,
      customQuestions,
    });

    // Save the application to the database
    await newApplication.save();

    // Return success response
    res.status(201).json({
      message: "Job application created successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error(error);

    // Handle validation errors or other issues
    res.status(400).json({
      message: "Failed to create job application",
      error: error.message,
    });
  }
};

module.exports = createJobApplication;
