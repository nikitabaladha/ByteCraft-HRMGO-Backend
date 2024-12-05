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
//   getAllTrainee,
//   deleteTrainee,

} = require("../controllers/Recruitment/index.js");

// Define routes
router.post("/create-job", Middleware, createJob);
router.post("/create-job-category-name", Middleware, createJobCategoryName);
router.get("/get-all-job-categories", Middleware, getAllJobCategories);
router.get("/get-all-job", Middleware, getAllJob);
router.get("/get-all-jobs/:id", Middleware, getAllJobs);
// router.get(
//   "/employee-get-by-branch-department",
//   Middleware,
//   getByBranchDepartment
// );

module.exports = router;
