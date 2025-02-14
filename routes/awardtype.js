const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createAwardType,
  getAllAwardType,
  updateAwardType,
  deleteAwardType
} = require("../controllers/HRMSystem");

router.post("/create-award-type", Middleware, createAwardType);
router.get("/award-type-get-all", Middleware, getAllAwardType);
router.put("/update-award-type/:id", Middleware, updateAwardType);
router.delete("/delete-award-type/:id", Middleware, deleteAwardType);

module.exports = router;
