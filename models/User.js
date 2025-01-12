const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage:{
      type: String,
    },
    password: {
      type: String,
      // required: true,
      required: function () {
        return this.passwordSwitch === true;
      },
    },
    passwordSwitch: {
      type: Boolean,
      default: false,
    },
    salt: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
