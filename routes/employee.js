// const express = require("express");
// const router = express.Router();
// const Middleware = require("../middleware/index.js");

// // Controller imports
// const {
//   createEmployee,
//   getAllEmployee,
//   getAllName,
//   getFilteredEmployees,
//   getByBranchDepartment,
// } = require("../controllers/Employee");

// // Define routes
// router.post("/employee", Middleware, createEmployee);
// router.get("/employee-get-all", Middleware, getAllEmployee);
// router.get("/employee-get-all-name", Middleware, getAllName);
// router.get("/employee-get-filter", Middleware, getFilteredEmployees);
// router.get(
//   "/employee-get-by-branch-department",
//   Middleware,
//   getByBranchDepartment
// );

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Middleware = require("../middleware/index.js");
// const upload = require("../controllers/uploadEmployeePhoto");
// const uploadFile = require("../controllers/uploadEmployeeCertificate");

// // Controller imports
// const {
//   createEmployee,
//   getAllEmployee,
//   getAllName,
//   getFilteredEmployees,
//   getByBranchDepartment,
// } = require("../controllers/Employee");

// // Define routes

// router.post(
//   "/employee",
//   upload.fields([
//     { name: "employeePhotoUrl", maxCount: 1 },
//     { name: "employeeCertificatePdf", maxCount: 1 },
//   ]),
//   Middleware,
//   createEmployee
// );
// router.get("/employee-get-all", Middleware, getAllEmployee);
// router.get("/employee-get-all-name", Middleware, getAllName);
// router.get("/employee-get-filter", Middleware, getFilteredEmployees);
// router.get(
//   "/employee-get-by-branch-department",
//   Middleware,
//   getByBranchDepartment
// );

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Middleware = require("../middleware/index.js");
// const uploadPhoto = require("../controllers/uploadEmployeePhoto");
// const uploadCertificate = require("../controllers/uploadEmployeeCertificate");

// // Combine the two middlewares
// const uploadFiles = (req, res, next) => {
//   uploadPhoto.fields([{ name: "employeePhotoUrl", maxCount: 1 }])(
//     req,
//     res,
//     (err) => {
//       if (err) {
//         return next(err);
//       }
//       uploadCertificate.fields([
//         { name: "employeeCertificateUrl", maxCount: 1 },
//       ])(req, res, (err) => {
//         if (err) {
//           return next(err);
//         }
//         next();
//       });
//     }
//   );
// };

// // Controller imports
// const {
//   createEmployee,
//   getAllEmployee,
//   getAllName,
//   getFilteredEmployees,
//   getByBranchDepartment,
// } = require("../controllers/Employee");

// // Define routes

// router.post("/employee", uploadFiles, Middleware, createEmployee);
// router.get("/employee-get-all", Middleware, getAllEmployee);
// router.get("/employee-get-all-name", Middleware, getAllName);
// router.get("/employee-get-filter", Middleware, getFilteredEmployees);
// router.get(
//   "/employee-get-by-branch-department",
//   Middleware,
//   getByBranchDepartment
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");
const upload = require("../controllers/uploadFiles");

// Combine the two middlewares
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

// Controller imports
const {
  createEmployee,
  getAllEmployee,
  getAllName,
  getFilteredEmployees,
  getByBranchDepartment,
} = require("../controllers/Employee");

// Define routes

router.post("/employee", uploadFiles, Middleware, createEmployee);
router.get("/employee-get-all", Middleware, getAllEmployee);
router.get("/employee-get-all-name", Middleware, getAllName);
router.get("/employee-get-filter", Middleware, getFilteredEmployees);
router.get(
  "/employee-get-by-branch-department",
  Middleware,
  getByBranchDepartment
);

module.exports = router;
