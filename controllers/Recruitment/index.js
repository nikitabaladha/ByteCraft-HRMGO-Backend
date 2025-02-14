// Use require instead of import
const createJob = require("./CreateJob/Create");
const createJobCategoryName = require("./JobCategory/create");
const getAllJobCategories = require("./JobCategory/getAllJobCategory");
const getAllJob = require("./CreateJob/getAllJob");
const getAllJobs = require("./CreateJob/getAllJobById");
const deleteJob = require("./CreateJob/deleteById");
const updateJob = require("./CreateJob/updateJob");
const createJobApplication = require("./Job Application/create");
const getAllJobApplications = require("./Job Application/getAllJobApplication");
const getJobApplicationById = require("./Job Application/getApplicationById");
const createJobOnboarding = require("./JobOnBoard/create");
const createInterviewSchedule = require("./InterviewSchedule/create");
const updateStatus = require("./Job Application/UpdateStatus");
const getStatusById = require("./Job Application/getStatusById");
const updateskill = require("./Job Application/updateSkill");
const getSkillById = require("./Job Application/getskillById");
const updateNotes = require("./Job Application/updateApplicantNotes");
const toggleArchiveStatus = require("./Job Application/updateIsArchived");
const getAllArchiveJobApplications = require("./Job Application/getAllArchiveApplication");
const deleteJobApplicationById = require("./Job Application/deleteAppliactionbyId");
const getJobOnboardings = require("./JobOnBoard/getALlJobBoarding");
const updatedJobOnboarding = require("./JobOnBoard/updateJobOnOnBoard");
const deletedJobOnboarding = require("./JobOnBoard/deleteJobOnBoardingById");
const getJobOnboardingById = require("./JobOnBoard/getJobOnBoard");
const getAllInterviewSchedules = require("./InterviewSchedule/getAllInterviewSchedule");
const updateInterviewSchedule = require("./InterviewSchedule/updateSchedule");
const deleteInterviewSchedule = require("./InterviewSchedule/deleteSchedule");
const getInterviewScheduleById = require("./InterviewSchedule/getScheduleById");

// const getByBranchDepartment = require("./Employee/getByBranchDepartment");

module.exports = {
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
  // getFilteredEmployees,
  // getByBranchDepartment,
};
