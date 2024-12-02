// Use require instead of import
const createTrainee = require("./Trainee/create");
const getAllTrainee = require("./Trainee/getAll");
const deleteTrainee = require("./Trainee/delete");
const getSingleTrainee = require("./Trainee/getTraineeByid")
const getUpdateTrainee = require("./Trainee/update");
const createTrainingList = require("./TrainingList/create");
const getAllTrainingList = require("./TrainingList/getAll")
const getSingleTrainingList = require("./TrainingList/getAllById")
const deleteTrainingList = require("./TrainingList/deleteTrainingList")
const updateTrainingList = require("./TrainingList/update")
const updatePerformace = require("./TrainingList/UpdatePerformance")
// const getByBranchDepartment = require("./Employee/getByBranchDepartment");

module.exports = {
  createTrainee,
  getAllTrainee,
  deleteTrainee,
  getSingleTrainee,
  getUpdateTrainee,
  createTrainingList,
  getAllTrainingList,
  getSingleTrainingList,
  deleteTrainingList,
  updateTrainingList,
  updatePerformace,
  // getFilteredEmployees,
  // getByBranchDepartment,
};
