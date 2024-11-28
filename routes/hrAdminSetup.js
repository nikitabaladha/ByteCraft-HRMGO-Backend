const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const { createAward, getAll } = require("../controllers/HrAdminSetup");

// Define routes
router.post("/award", Middleware, createAward);
router.get("/award", Middleware, getAll);

module.exports = router;
