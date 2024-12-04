// ByteCraft-HRMGO-Backend\routes\contractType.js

const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createContract,
  getAllContract,
  deleteContractById,
} = require("../controllers/Contract");

router.post("/contract", Middleware, createContract);
router.get("/contract", Middleware, getAllContract);
router.delete("/contract/:id", Middleware, deleteContractById);

module.exports = router;
