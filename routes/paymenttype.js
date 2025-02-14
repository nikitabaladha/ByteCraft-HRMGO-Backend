const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createPaymentType,
  getAllPaymentTypes,
  updatePaymentType,
  deletePaymentType,
} = require("../controllers/HRMSystem");


router.post("/create-payment-type", Middleware, createPaymentType);
router.get("/payment-type-get-all", Middleware, getAllPaymentTypes);
router.put("/update-payment-type/:id", Middleware, updatePaymentType);
router.delete("/delete-payment-type/:id", Middleware, deletePaymentType);

module.exports = router;
