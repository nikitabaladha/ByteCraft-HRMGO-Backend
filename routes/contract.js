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
  getByContractId,
  deleteById,

  createContractNote,
  getNoteByContractId,
  deleteNoteById,

  getDescriptionByContractId,
  updateDescriptionById,
} = require("../controllers/Contract");

router.post("/contract", Middleware, createContract);
router.get("/contract", Middleware, getAllContract);
router.delete("/contract/:id", Middleware, deleteContractById);
router.put("/contract/:id", Middleware, updateContractById);

router.post("/contract-comment", Middleware, createContractComment);
router.get("/contract-comment", Middleware, getByContractId);
router.delete("/contract-comment/:id", Middleware, deleteById);

router.post("/contract-note", Middleware, createContractNote);
router.get("/contract-note", Middleware, getNoteByContractId);
router.delete("/contract-note/:id", Middleware, deleteNoteById);

router.get("/contract-description", Middleware, getDescriptionByContractId);
router.put("/contract-description/:id", Middleware, updateDescriptionById);

module.exports = router;
