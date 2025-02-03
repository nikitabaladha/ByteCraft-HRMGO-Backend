const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createJobStage,
  getAllJobStage,
  updateJobStage,
  deleteJobStage
} = require("../controllers/HRMSystem");

router.post("/create-job-stage", Middleware, createJobStage);
router.get("/job-stage-get-all", Middleware, getAllJobStage);
router.put("/update-job-stage/:id", Middleware, updateJobStage);
router.delete("/delete-job-stage/:id", Middleware, deleteJobStage);

module.exports = router;
