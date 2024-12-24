const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createTerminationType,
  getAllTerminationTypes,
  updateTerminationType,
  deleteTerminationType,
} = require("../controllers/HRMSystem");

router.post("/create-termination-type", Middleware, createTerminationType);
router.get("/termination-type-get-all", Middleware, getAllTerminationTypes);
router.put("/update-termination-type/:id", Middleware, updateTerminationType);
router.delete("/delete-termination-type/:id", Middleware, deleteTerminationType);

module.exports = router;
