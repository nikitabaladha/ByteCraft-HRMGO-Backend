// ByteCraft-HRMGO-Backend\routes\contractType.js

const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createContract,
  getAllContract,
  deleteContractById,
  updateContractById,

  createContractComment,
  getAllContractComment,
  deleteById,
} = require("../controllers/Contract");

router.post("/contract", Middleware, createContract);
router.get("/contract", Middleware, getAllContract);
router.delete("/contract/:id", Middleware, deleteContractById);
router.put("/contract/:id", Middleware, updateContractById);

router.post("/contract-comment", Middleware, createContractComment);
router.get("/contract-comment", Middleware, getAllContractComment);
router.delete("/contract-comment/:id", Middleware, deleteById);

module.exports = router;
