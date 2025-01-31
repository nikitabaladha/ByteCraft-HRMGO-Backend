const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createCompetencyRating,
  // getAllCompetencyList,
} = require("../controllers/Competency");

router.post("/competency-rating", Middleware, createCompetencyRating);
// router.get("/competency-list", Middleware, getAllCompetencyList);

module.exports = router;
