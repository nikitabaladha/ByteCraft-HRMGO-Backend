// HRMGO-Backend\models\Branch.js
const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee", // Refers to the Employee model
        required: true,
      },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(v); // Validation for a valid phone number
        },
        message: (props) => `${props.value} is not a valid contact number!`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    expertise: {
        type: String, // Array of expertise areas (e.g., subjects or topics the trainer specializes in)
        required: true,
      },
      Address: {
        type: String, // Array of certification names or titles
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model("Branch", BranchSchema);
module.exports = Branch;
