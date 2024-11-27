const mongoose = require("mongoose");

const TraineeSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      default: 'Unknown',
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(v); // Validate phone numbers
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
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validate email format
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    expertise: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the model
const Trainee = mongoose.models.Trainee || mongoose.model("Trainee", TraineeSchema);

module.exports = Trainee;
