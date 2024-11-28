const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createAward,
  getAllAward,
  updateAwardById,
  deleteAwardById,
} = require("../controllers/HrAdminSetup");

// Define routes
router.post("/award", Middleware, createAward);
router.get("/award", Middleware, getAllAward);
router.put("/award/:id", Middleware, updateAwardById);
router.delete("/award/:id", Middleware, deleteAwardById);

module.exports = router;
