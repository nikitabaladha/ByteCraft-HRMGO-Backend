const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createPerformance,
  getPerformance,
  deletePerformance,
} = require("../controllers/Performance");

router.post("/performance", Middleware, createPerformance);
router.get("/performance-get-all", Middleware, getPerformance);
router.delete("/performance/:id", Middleware, deletePerformance);

module.exports = router;
