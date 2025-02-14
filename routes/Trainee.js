const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
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
  //   getFilteredEmployees,
  //   getByBranchDepartment,
} = require("../controllers/Training/index.js");

// Define routes
router.post("/trainee", Middleware, createTrainee);
router.get("/trainee-get-all", Middleware, getAllTrainee);
router.get("/trainee-get-all/:id", Middleware, getSingleTrainee);
router.delete("/traineeDelete/:id", Middleware, deleteTrainee);
router.put("/trainee-update/:id", Middleware, getUpdateTrainee);
router.post("/training-list", Middleware, createTrainingList);
router.get("/training-list-get-all", Middleware, getAllTrainingList);
router.get("/training-list-get-all/:id", Middleware, getSingleTrainingList);
router.delete("/training-list-delete/:id", Middleware, deleteTrainingList);
router.put("/training-list-update/:id", Middleware, updateTrainingList);
router.put("/update-performance/:id", Middleware, updatePerformace);
// router.get("/employee-get-filter", Middleware, getFilteredEmployees);
// router.get(
//   "/employee-get-by-branch-department",
//   Middleware,
//   getByBranchDepartment
// );

module.exports = router;
