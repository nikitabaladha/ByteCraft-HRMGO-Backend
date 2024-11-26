const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createAppraisal,
  getAllAppraisal,
} = require("../controllers/Competency");

// Define routes
router.post("/appraisal", Middleware, createAppraisal);
router.get("/appraisal", Middleware, getAllAppraisal);

module.exports = router;
