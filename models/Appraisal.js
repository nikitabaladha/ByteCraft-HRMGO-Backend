const mongoose = require("mongoose");

const appraisalSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    appraisalDate: {
      type: Date,
      required: true,
    },
    remarks: {
      type: String,
    },
    indicatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Indicator",
      required: true,
    },
    overAllRating: {
      type: Number,
      // required: true,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 100) / 100,
    },
    appraisalCompetencies: {
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
  },

  {
    timestamps: true,
  }
);

appraisalSchema.index(
  {
    employeeId: 1,
    branchId: 1,
    appraisalDate: 1,
  },
  { unique: true }
);

const Appraisal = mongoose.model("Appraisal", appraisalSchema);

module.exports = Appraisal;
