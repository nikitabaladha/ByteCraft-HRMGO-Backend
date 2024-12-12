const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");
const upload = require("../controllers/uploadFiles");

const uploadFiles = (req, res, next) => {
  upload.fields([
    { name: "employeePhotoUrl", maxCount: 1 },
    { name: "employeeCertificateUrl", maxCount: 1 },
    { name: "employeeResumeUrl", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

const {
  createEmployee,
  getAllEmployee,
  getAllName,
  getFilteredEmployees,
  getByBranchDepartment,
  updateById,
  deleteById,
} = require("../controllers/Employee");

router.post("/employee", uploadFiles, Middleware, createEmployee);
router.get("/employee-get-all", Middleware, getAllEmployee);
router.get("/employee-get-all-name", Middleware, getAllName);
router.get("/employee-get-filter", Middleware, getFilteredEmployees);
router.get(
  "/employee-get-by-branch-department",
  Middleware,
  getByBranchDepartment
);
router.put("/employee/:id", uploadFiles, Middleware, updateById);

router.delete("/employee/:id", Middleware, deleteById);

module.exports = router;
