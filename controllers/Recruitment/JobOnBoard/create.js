// const JobOnboard = require("../../../models/AddToJobOnboard");

// // Create a new job onboarding
// const createJobOnboarding = async (req, res) => {
//   try {
//     const {
//       applicantId,
//       applicantName,
//       applicatAppliedFor,
//       applicationCreatedAt,
//       applicantPhone,
//       applicantDOB,
//       applicantGender,
//       applicantEmail,
//       applicantAddress,
//       joining_date,
//       days_of_week,
//       salary,
//       salary_type,
//       salary_duration,
//       job_type,
//       status,
//     } = req.body;

//     // Validate required fields
//     if (
//       !applicantId ||
//       !applicantName ||
//       !applicatAppliedFor ||
//       !applicationCreatedAt ||
//       !applicantPhone ||
//       !applicantDOB ||
//       !applicantGender ||
//       !applicantEmail ||
//       !applicantAddress ||
//       !joining_date ||
//       !days_of_week ||
//       !salary ||
//       !salary_type ||
//       !salary_duration ||
//       !job_type ||
//       !status
//     ) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Create a new JobOnboard document
//     const jobOnboarding = new JobOnboard({
//       applicantId,
//       applicantName,
//       applicatAppliedFor,
//       applicationCreatedAt,
//       applicantPhone,
//       applicantDOB,
//       applicantGender,
//       applicantEmail,
//       applicantAddress,
//       joining_date,
//       days_of_week,
//       salary,
//       salary_type,
//       salary_duration,
//       job_type,
//       status,
//     });

//     // Save the document in the database
//     const savedJobOnboarding = await jobOnboarding.save();

//     res.status(201).json({
//       message: "Job onboarding created successfully.",
//       jobOnboarding: savedJobOnboarding,
//     });
//   } catch (error) {
//     console.error("Error creating job onboarding:", error);
//     res.status(500).json({ error: "Failed to create job onboarding." });
//   }
// };

// module.exports = createJobOnboarding;

// const JobOnboard = require("../models/jobOnboard"); // Adjust the path as needed
const JobOnboard = require("../../../models/AddToJobOnboard")
// Controller to create a job onboarding record
const createJobOnboarding = async (req, res) => {
  try {
    const {
      applicantId,
      jobBranch,
      applicantName,
      applicatAppliedFor,
      applicationCreatedAt,
      applicantPhone,
      applicantDOB,
      applicantGender,
      applicantEmail,
      applicantAddress,
      joining_date,
      days_of_week,
      salary,
      salary_type,
      salary_duration,
      job_type,
      status,
    } = req.body;

    // Validate required fields
    if (
      !applicantId ||
      !jobBranch ||
      !applicantName ||
      !applicatAppliedFor ||
      !applicationCreatedAt ||
      !applicantPhone ||
      !applicantEmail ||
      !joining_date ||
      !days_of_week ||
      !salary ||
      !salary_type ||
      !salary_duration ||
      !job_type ||
      !status
    ) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Create a new JobOnboard record
    const newJobOnboard = new JobOnboard({
      applicantId,
      jobBranch,
      applicantName,
      applicatAppliedFor,
      applicationCreatedAt,
      applicantPhone,
      applicantDOB,
      applicantGender,
      applicantEmail,
      applicantAddress,
      joining_date,
      days_of_week,
      salary,
      salary_type,
      salary_duration,
      job_type,
      status,
    });

    // Save the record to the database
    const savedJobOnboard = await newJobOnboard.save();

    res.status(201).json({ message: "Job onboard created successfully", data: savedJobOnboard });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports =  createJobOnboarding ;

