const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema(
  {
    occasion: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

HolidaySchema.index(
  { occasion: 1, startDate: 1, endDate: 1 },
  { unique: true }
);
const Holiday = mongoose.model("Holiday", HolidaySchema);

module.exports = Holiday;
