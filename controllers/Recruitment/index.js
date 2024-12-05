// Use require instead of import
const createJob = require("./CreateJob/create");
const createJobCategoryName = require("./JobCategory/create");
const getAllJobCategories = require("./JobCategory/getAllJobCategory")
const getAllJob = require("./CreateJob/getAllJob")
const getAllJobs = require("./CreateJob/getAllJobById")

// const getByBranchDepartment = require("./Employee/getByBranchDepartment");

module.exports = {
  createJob,
  createJobCategoryName,
  getAllJobCategories,
  getAllJob,
  getAllJobs,
//   getAllTrainee,
//   deleteTrainee,
  // getFilteredEmployees,
  // getByBranchDepartment,
};
