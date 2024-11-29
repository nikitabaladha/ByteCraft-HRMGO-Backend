const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createAward,
  getAllAward,
  updateAwardById,
  deleteAwardById,

  createResignation,
  getAllResignation,
  updateResignationById,
  deleteResignationById,

  createPromotion,
  getAllPromotion,
  updatePromotionById,
  deletePromotionById,
} = require("../controllers/HrAdminSetup");

// Define routes
router.post("/award", Middleware, createAward);
router.get("/award", Middleware, getAllAward);
router.put("/award/:id", Middleware, updateAwardById);
router.delete("/award/:id", Middleware, deleteAwardById);

router.post("/resignation", Middleware, createResignation);
router.get("/resignation", Middleware, getAllResignation);
router.put("/resignation/:id", Middleware, updateResignationById);
router.delete("/resignation/:id", Middleware, deleteResignationById);

router.post("/promotion", Middleware, createPromotion);
router.get("/promotion", Middleware, getAllPromotion);
router.put("/promotion/:id", Middleware, updatePromotionById);
router.delete("/promotion/:id", Middleware, deletePromotionById);

module.exports = router;
