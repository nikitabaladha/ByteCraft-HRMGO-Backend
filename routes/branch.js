const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createBranch,
  getAllBranch,
  updatebranch,
  deletebranch
} = require("../Controllers/Branch-Department");

router.post("/branch", Middleware, createBranch);
router.get("/branch-get-all", Middleware, getAllBranch);
router.put("/update-branch/:id", Middleware, updatebranch);
router.delete("/delete-branch/:id", Middleware, deletebranch);

module.exports = router;
