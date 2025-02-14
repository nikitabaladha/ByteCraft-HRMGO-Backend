const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createBranch,
  getAllBranch,
  getBranchById,
  updatebranch,
  deletebranch,
} = require("../controllers/Branch-Department-Designation");

router.post("/branch", Middleware, createBranch);
router.get("/branch-get-all", Middleware, getAllBranch);
router.get("/branches/:id", getBranchById);
router.put("/update-branch/:id", Middleware, updatebranch);
router.delete("/delete-branch/:id", Middleware, deletebranch);

module.exports = router;
