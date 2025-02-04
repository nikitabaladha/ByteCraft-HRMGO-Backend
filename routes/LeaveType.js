const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createLeaveType,
  getAllLeaveType,
  updateLeaveType,
  deleteLeaveType
} = require("../controllers/HRMSystem");

router.post("/leave-type", Middleware, createLeaveType);
router.get("/leave-type-get-all", Middleware, getAllLeaveType);
router.put("/update-leave-type/:id", Middleware, updateLeaveType);
router.delete("/delete-leave-type/:id", Middleware, deleteLeaveType);

module.exports = router;
