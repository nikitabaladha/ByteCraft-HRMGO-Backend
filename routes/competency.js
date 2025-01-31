const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createCompetency,
  getAllCompetency,
} = require("../controllers/Competency");

router.post("/competency", Middleware, createCompetency);
router.get("/competency", Middleware, getAllCompetency);

module.exports = router;
