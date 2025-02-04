const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDepartment,
  getAllDepartment,
  getAllDepartmentByBranchId,
  updateDepartment,
  deleteDepartment,
  getDepartmentById,
} = require("../controllers/Branch-Department-Designation");

router.post("/department", Middleware, createDepartment);
router.get("/department-get-all", Middleware, getAllDepartment);
router.get("/departments/:id", getDepartmentById);
router.get(
  "/department-get-all-by-branch-id",
  Middleware,
  getAllDepartmentByBranchId
);
router.put("/update-department/:departmentId", Middleware, updateDepartment);
router.delete("/delete-department/:id", Middleware, deleteDepartment);

module.exports = router;
