const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");
const upload = require("../controllers/uploadFiles");

const uploadFiles = (req, res, next) => {
  const fileSizeLimits = {
    employeePhotoUrl: {
      size: 2 * 1024 * 1024,
      message: "Employee Photo must be less than 2 MB.",
    },
    employeeCertificateUrl: {
      size: 3 * 1024 * 1024,
      message: "Employee Certificate must be less than 3 MB.",
    },
    employeeResumeUrl: {
      size: 3 * 1024 * 1024,
      message: "Employee Resume must be less than 3 MB.",
    },
  };

  upload.fields([
    { name: "employeePhotoUrl", maxCount: 1 },
    { name: "employeeCertificateUrl", maxCount: 1 },
    { name: "employeeResumeUrl", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE" && fileSizeLimits[err.field]) {
        return res
          .status(400)
          .json({ message: fileSizeLimits[err.field].message });
      }

      return next(err);
    }

    const uploadedFiles = req.files;

    if (uploadedFiles) {
      for (const field in uploadedFiles) {
        const file = uploadedFiles[field][0];
        if (file && file.size > fileSizeLimits[field].size) {
          return res.status(400).json({
            message: fileSizeLimits[field].message,
          });
        }
      }
    }

    next();
  });
};

module.exports = uploadFiles;

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
