
const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDeductionOption,
  getAllDeductionOption,
  updateDeductionOption,
  deleteDeductionOption
} = require("../controllers/HRMSystem");

router.post("/deduction-option", Middleware, createDeductionOption);
router.get("/deduction-option-get-all", Middleware, getAllDeductionOption);
router.put("/update-deduction-option/:id", Middleware, updateDeductionOption);
router.delete("/delete-deduction-option/:id", Middleware, deleteDeductionOption);

module.exports = router;
