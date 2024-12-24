const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDesignation,
  getAllDesignation,
  updatedDesignation,
  deleteDesignation,
//   getAllDesignationByDepartmentId,
designationbyid
} = require("../controllers/Branch-Department");

router.post("/designation", Middleware, createDesignation);
router.get("/designation-get-all", Middleware, getAllDesignation);
router.put("/update-designation/:id", Middleware, updatedDesignation);
router.delete("/delete-designation/:id", Middleware, deleteDesignation);
// router.get(
//   "/designation-get-all-by-department-id",
//   Middleware,
//   getAllDesignationByDepartmentId
// );

router.get("/designationbyid/:designationId", Middleware, designationbyid);
module.exports = router;