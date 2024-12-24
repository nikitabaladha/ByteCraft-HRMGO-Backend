const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDepartment,
  getAllDepartment,
  getAllDepartmentByBranchId,
  updateDepartment,
  deleteDepartment
} = require("../controllers/Branch-Department");

router.post("/department", Middleware, createDepartment);
router.get("/department-get-all", Middleware, getAllDepartment);
router.put("/update-department/:departmentId", Middleware, updateDepartment);
router.delete("/delete-department/:id", Middleware, deleteDepartment);
router.get(
  "/department-get-all-by-branch-id",
  Middleware,
  getAllDepartmentByBranchId
);

module.exports = router;
