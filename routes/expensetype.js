const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createExpenseType,
  getAllExpenseTypes,
  updateExpenseType,
  deleteExpenseType,
} = require("../controllers/HRMSystem");

router.post("/create-expense-type", Middleware, createExpenseType);
router.get("/expense-type-get-all", Middleware, getAllExpenseTypes);
router.put("/update-expense-type/:id", Middleware, updateExpenseType);
router.delete("/delete-expense-type/:id", Middleware, deleteExpenseType);

module.exports = router;
