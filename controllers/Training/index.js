// Use require instead of import
const createTrainee = require("./Trainee/create");
const getAllTrainee = require("./Trainee/getAll");
const deleteTrainee = require("./Trainee/delete");
// const getFilteredEmployees = require("./Employee/getFilteredEmployees");
// const getByBranchDepartment = require("./Employee/getByBranchDepartment");

module.exports = {
  createTrainee,
  getAllTrainee,
  deleteTrainee,
  // getFilteredEmployees,
  // getByBranchDepartment,
};
