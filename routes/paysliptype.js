const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createPayslipType,
  getAllPayslipTypes,
  updatePayslipType,
  deletePayslipType
} = require("../controllers/HRMSystem");

router.post("/payslip-type", Middleware, createPayslipType);
router.get("/payslip-type-get-all", Middleware, getAllPayslipTypes);
router.put("/update-payslip-type/:id", Middleware, updatePayslipType);
router.delete("/delete-payslip-type/:id", Middleware, deletePayslipType);

module.exports = router;
