const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createLoanOption,
  getAllLoanOption,
  updateLoanOption,
  deleteLoanOption
} = require("../controllers/HRMSystem");

router.post("/loan-option", Middleware, createLoanOption);
router.get("/loan-option-get-all", Middleware, getAllLoanOption);
router.put("/update-loan-option/:id", Middleware, updateLoanOption);
router.delete("/delete-loan-option/:id", Middleware, deleteLoanOption);

module.exports = router;
