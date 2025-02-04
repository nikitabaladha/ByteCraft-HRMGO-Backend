const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createTrainingType,
  getAllTrainingType,
  updateTrainingType,
  deleteTrainingType
} = require("../controllers/HRMSystem");

router.post("/create-training-type", Middleware, createTrainingType);
router.get("/training-type-get-all", Middleware, getAllTrainingType);
router.put("/update-training-type/:id", Middleware, updateTrainingType);
router.delete("/delete-training-type/:id", Middleware, deleteTrainingType);

module.exports = router;
