const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createTrainee,
  getAllTrainee,
//   getAllName,
//   getFilteredEmployees,
//   getByBranchDepartment,
} = require("../controllers/Training");

// Define routes
router.post("/trainee", Middleware, createTrainee);
router.get("/trainee-get-all", Middleware, getAllTrainee);
// router.get("/employee-get-all-name", Middleware, getAllName);
// router.get("/employee-get-filter", Middleware, getFilteredEmployees);
// router.get(
//   "/employee-get-by-branch-department",
//   Middleware,
//   getByBranchDepartment
// );

module.exports = router;
