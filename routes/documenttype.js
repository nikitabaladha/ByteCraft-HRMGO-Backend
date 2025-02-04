const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDocumentType,
  getAllDocumentTypes,
  updateDocumentType,
  deleteDocumentType
} = require("../controllers/HRMSystem");

router.post("/document-type", Middleware, createDocumentType);
router.get("/document-type-get-all", Middleware, getAllDocumentTypes);
router.put("/update-document-type/:id", Middleware, updateDocumentType);
router.delete("/delete-document-type/:id", Middleware, deleteDocumentType);

module.exports = router;
