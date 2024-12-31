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

    if (!req.files || !req.files.profile) {
      return res.status(400).json({
        hasError: true,
        message: "Employee Photo is required.",
      });
    }

    if (!req.files || !req.files.resume) {
      return res.status(400).json({
        hasError: true,
        message: "Employee Resume is required.",
      });
    }

    const profileImagePath = "/Images/profile";
    const profile = `${profileImagePath}/${req.files.profile[0].filename}`;

    const resumeResumePath = "/Documents/resume";
    const resume = `${resumeResumePath}/${req.files.resume[0].filename}`;

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

module.exports = createJobApplication
