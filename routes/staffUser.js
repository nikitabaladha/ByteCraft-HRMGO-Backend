const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createRole,
  getAllRoles,
  deletedRole,
  updateRole,
} = require("../controllers/Staff/index.js");

// Define routes
router.post("/create-role", Middleware, createRole)
router.get("/get-all-roles", Middleware, getAllRoles)
router.delete("/delete-role/:id", Middleware, deletedRole)
router.put("/update-role/:id", Middleware, updateRole)

module.exports = router;
