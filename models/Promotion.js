const mongoose = require("mongoose");

// Define the schema for managing leaves with a reference to Employee
const PromotionSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    designationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },
    promotionTitle: {
      type: String,
      required: true,
    },
    promotionDate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

PromotionSchema.index(
  { employeeId: 1, designationId: 1, promotionDate: 1 },
  { unique: true }
);

const Promotion = mongoose.model("Promotion", PromotionSchema);
module.exports = Promotion;
