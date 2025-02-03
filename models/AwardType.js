const mongoose = require("mongoose");

const AwardTypeSchema = new mongoose.Schema({
  awardName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true }
);

const AwardType = mongoose.model("AwardType", AwardTypeSchema);
module.exports = AwardType;
