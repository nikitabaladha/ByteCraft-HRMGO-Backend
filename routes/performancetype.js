const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createPerformanceType,
  getAllPerformanceTypes,
  updatePerformanceType,
  deletePerformanceType,
} = require("../controllers/HRMSystem");

router.post("/create-performance-type", Middleware, createPerformanceType);
router.get("/performance-type-get-all", Middleware, getAllPerformanceTypes);
router.put("/update-performance-type/:id", Middleware, updatePerformanceType);
router.delete("/delete-performance-type/:id", Middleware, deletePerformanceType);

module.exports = router;
