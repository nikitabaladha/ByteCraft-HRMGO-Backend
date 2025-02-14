const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDesignation,
  getAllDesignation,
  getAllDesignationByDepartmentId,
  updatedDesignation,
  deleteDesignation,
} = require("../controllers/Branch-Department-Designation");

router.post("/designation", Middleware, createDesignation);
router.get("/designation-get-all", Middleware, getAllDesignation);
router.get(
  "/designation-get-all-by-department-id",
  Middleware,
  getAllDesignationByDepartmentId
);
router.put("/update-designation/:id", Middleware, updatedDesignation);
router.delete("/delete-designation/:id", Middleware, deleteDesignation);

module.exports = router;
