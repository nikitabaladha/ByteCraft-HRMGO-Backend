const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createAllowanceOption,
  getAllAllowanceOption,
  updateAllowanceOption,
  deleteAllowanceOption
} = require("../controllers/HRMSystem");

router.post("/allowance-option", Middleware, createAllowanceOption);
router.get("/allowance-option-get-all", Middleware, getAllAllowanceOption);
router.put("/update-allowance-option/:id", Middleware, updateAllowanceOption);
router.delete("/delete-allowance-option/:id", Middleware, deleteAllowanceOption);

module.exports = router;
