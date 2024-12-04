// ByteCraft-HRMGO-Backend\routes\contractType.js

const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createContractType,
  getAllContractType,
} = require("../controllers/ContractType");

router.post("/contract-type", Middleware, createContractType);
router.get("/contract-type", Middleware, getAllContractType);

module.exports = router;
