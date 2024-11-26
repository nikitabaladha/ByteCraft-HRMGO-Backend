const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDesignation,
  getAllDesignation,
  getAllDesignationByDepartmentId,
} = require("../controllers/Branch-Department-Designation");

router.post("/designation", Middleware, createDesignation);
router.get("/designation-get-all", Middleware, getAllDesignation);
router.get(
  "/designation-get-all-by-department-id",
  Middleware,
  getAllDesignationByDepartmentId
);

module.exports = router;
