const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createexpense,
  deleteexpense,
  getallexpense,
  updateexpense,
} = require("../controllers/Finance/index.js");

// Define routes
router.post("/create_expense", Middleware, createexpense);
router.delete("/delete_expense/:id", Middleware, deleteexpense);
router.put("/update_expense/:id", Middleware, updateexpense);
router.get("/getall_expense", Middleware, getallexpense);

module.exports = router;
