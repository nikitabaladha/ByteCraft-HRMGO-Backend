// ByteCraft-HRMGO-Backend\routes\contractType.js

const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createContract,
  getAllContract,
  deleteContractById,
  updateContractById,
} = require("../controllers/Contract");

router.post("/contract", Middleware, createContract);
router.get("/contract", Middleware, getAllContract);
router.delete("/contract/:id", Middleware, deleteContractById);
router.put("/contract/:id", Middleware, updateContractById);

module.exports = router;
