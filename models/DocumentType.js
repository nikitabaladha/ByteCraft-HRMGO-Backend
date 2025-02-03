const mongoose = require("mongoose");

const DocumentTypeSchema = new mongoose.Schema({
  documentType: {
    type: String,
    required: true,
    unique: true,
  },
  isRequired: {
    type: String,
    required: true,
    enum: ["Required", "Not Required"], 
  },
},
{ timestamps: true }
);

const DocumentType = mongoose.model("DocumentType", DocumentTypeSchema);
module.exports = DocumentType;
