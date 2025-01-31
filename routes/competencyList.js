const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createCompetencyList,
  getAllCompetencyList,
} = require("../controllers/Competency");

router.post("/competency-list", Middleware, createCompetencyList);
router.get("/competency-list", Middleware, getAllCompetencyList);

module.exports = router;
