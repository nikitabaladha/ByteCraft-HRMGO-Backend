const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createManageLeave,
  getAllManageLeave,
  updateStatus,
  updateByLeaveId,
  getAllByQuery,
  deleteLeaveById,
} = require("../controllers/Timesheet");

router.post("/manage-leave", Middleware, createManageLeave);
router.get("/manage-leave-get-all", Middleware, getAllManageLeave);
router.put("/manage-leave-update-status/:id", Middleware, updateStatus);
router.put("/manage-leave-update/:id", Middleware, updateByLeaveId);
router.get("/manage-leave-get-all-by-query", Middleware, getAllByQuery);
router.delete("/manage-leave-delete-by-id/:id", Middleware, deleteLeaveById);

module.exports = router;
