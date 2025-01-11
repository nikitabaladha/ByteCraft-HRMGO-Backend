const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createBranch,
  getAllBranch,
  getBranchById
} = require("../controllers/Branch-Department-Designation");

router.post("/branch", Middleware, createBranch);
router.get("/branch-get-all", Middleware, getAllBranch);
router.get("/branches/:id", getBranchById);

module.exports = router;
