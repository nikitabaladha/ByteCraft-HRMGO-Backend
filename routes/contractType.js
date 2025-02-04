const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createContractType,
  getAllContractTypes,
  updateContractType,
  deleteContractType,
} = require("../controllers/HRMSystem");

router.post("/create-contract-type", Middleware, createContractType);
router.get("/contract-type-get-all", Middleware, getAllContractTypes);
router.put("/update-contract-type/:id", Middleware, updateContractType);
router.delete("/delete-contract-type/:id", Middleware, deleteContractType);

module.exports = router;
