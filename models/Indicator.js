const mongoose = require("mongoose");

const indicatorSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    designationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },
    addedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    competencies: {
      organizational: {
        type: [
          {
            name: {
              type: String,
              required: true,
              enum: ["Leadership", "Project Management"],
            },
            rating: {
              type: Number,
              required: true,
              min: 1,
              max: 5,
            },
          },
        ],
        required: true,
        _id: false,
      },
      technical: {
        type: [
          {
            name: {
              type: String,
              required: true,
              enum: ["Allocating Resources"],
            },
            rating: {
              type: Number,
              required: true,
              min: 1,
              max: 5,
            },
          },
        ],
        required: true,
        _id: false,
      },
      behavioural: {
        type: [
          {
            name: {
              type: String,
              required: true,
              enum: ["Business Process", "Oral Communication"],
            },
            rating: {
              type: Number,
              required: true,
              min: 1,
              max: 5,
            },
          },
        ],
        required: true,
        _id: false,
      },
    },

    overAllRating: {
      type: Number,
      // required: true,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 100) / 100,
    },
    createdAt: {
      type: Date,

      // default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

indicatorSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date(); // Set createdAt to current date if not provided
  }
  this.createdAt.setUTCHours(0, 0, 0, 0); // Truncate time part
  next();
});

// Define a unique index on the combination of fields
indicatorSchema.index(
  {
    branchId: 1,
    departmentId: 1,
    designationId: 1,
    addedById: 1,
    createdAt: 1,
  },
  { unique: true }
);

const Indicator = mongoose.model("Indicator", indicatorSchema);

module.exports = Indicator;
