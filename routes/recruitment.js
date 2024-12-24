const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createJob,
  createJobCategoryName,
  getAllJobCategories,
  getAllJob,
  getAllJobs,
  deleteJob,
  updateJob,
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  createJobOnboarding,
  createInterviewSchedule,
  updateStatus,
  getStatusById,
  updateskill,
  getSkillById,
  updateNotes,
  toggleArchiveStatus,
  getAllArchiveJobApplications,
  deleteJobApplicationById,
  getJobOnboardings,
  updatedJobOnboarding,
  deletedJobOnboarding,
  getJobOnboardingById,
  getAllInterviewSchedules,
  updateInterviewSchedule,
  deleteInterviewSchedule,
  getInterviewScheduleById,
//   getAllTrainee,
//   deleteTrainee,

} = require("../controllers/Recruitment/index.js");
const deleteById = require("../controllers/Recruitment/CreateJob/deleteById.js");

// Define routes
router.post("/create-job", Middleware, createJob);
router.post("/create-job-category-name", Middleware, createJobCategoryName);
router.get("/get-all-job-categories", Middleware, getAllJobCategories);
router.get("/get-all-job", Middleware, getAllJob);
router.get("/get-all-jobs/:id", Middleware, getAllJobs);
router.delete("/delete-job/:id", Middleware, deleteJob);
router.put("/update-job/:id", Middleware, updateJob);
router.post("/create-job-application", Middleware, createJobApplication);
router.get("/get-all-job-application", Middleware, getAllJobApplications);
router.get("/get-application/:id", Middleware, getJobApplicationById);
router.post("/create-job-onBoard", Middleware, createJobOnboarding);
router.post("/create-interview-schedule", Middleware, createInterviewSchedule);
router.put("/update-status/:id", Middleware, updateStatus)
router.get("/get-status-by-id/:id", Middleware, getStatusById)
router.put("/update-skill/:id", Middleware, updateskill)
router.get("/get-skill/:id", Middleware, getSkillById)
router.put("/update-notes/:id", Middleware, updateNotes)
router.put("/toggle-archive-status/:id", Middleware, toggleArchiveStatus)
router.get("/get-all-archive-application", Middleware, getAllArchiveJobApplications)
router.delete("/delete-application-by-id/:id", Middleware, deleteJobApplicationById)
router.get("/get-all-job-boards", Middleware, getJobOnboardings);
router.put("/update-job-on-board/:id", Middleware, updatedJobOnboarding)
router.delete("/delete-job-on-board/:id", Middleware, deletedJobOnboarding)
router.get("/get-job-on-board-by-id/:id", Middleware, getJobOnboardingById)
router.get("/get-all-interview-schedule", Middleware, getAllInterviewSchedules)
router.put("/update-interview-schedule/:id", Middleware, updateInterviewSchedule)
router.delete("/delete-interview-schedule/:id", Middleware, deleteInterviewSchedule)
router.get("/get-schedule-by-id/:id", Middleware, getInterviewScheduleById)
// router.get(
//   "/employee-get-by-branch-department",
//   Middleware,
//   getByBranchDepartment
// );

module.exports = router;
