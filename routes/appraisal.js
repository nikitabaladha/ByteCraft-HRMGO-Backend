const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createAppraisal,
  getAllAppraisal,
  appraisalGetById,
  appraisalDeleteById,
  updatedAppraisal,
} = require("../controllers/Performance");

// Define routes
router.post("/appraisal", Middleware, createAppraisal);
router.get("/appraisal", Middleware, getAllAppraisal);
router.get("/appraisal/:id", Middleware, appraisalGetById);
router.delete("/appraisal/:id", Middleware, appraisalDeleteById);
router.put("/appraisal/:id", Middleware, updatedAppraisal);

module.exports = router;
