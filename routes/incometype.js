const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createIncomeType,
  getAllIncomeTypes,
  updateIncomeType,
  deleteIncomeType,
} = require("../controllers/HRMSystem");

router.post("/create-income-type", Middleware, createIncomeType);
router.get("/income-type-get-all", Middleware, getAllIncomeTypes);
router.put("/update-income-type/:id", Middleware, updateIncomeType);
router.delete("/delete-income-type/:id", Middleware, deleteIncomeType);

module.exports = router;
