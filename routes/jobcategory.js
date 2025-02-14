const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createJobCategory,
  getAllJobCategories,
  updateJobCategory,
  deleteJobCategory,
} = require("../controllers/HRMSystem");

router.post("/create-job-category", Middleware, createJobCategory);
router.get("/job-category-get-all", Middleware, getAllJobCategories);
router.put("/update-job-category/:id", Middleware, updateJobCategory);
router.delete("/delete-job-category/:id", Middleware, deleteJobCategory);

module.exports = router;
