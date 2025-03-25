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
    profileImage: {
      type: String,
      default: "/Images/profileImage/default_avatar.png", // Default profile image
    },
    password: {
      type: String,
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
    },
    role: {
      type: String,
      required: true,
    },
    newUserToggle: {
      type: Boolean
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;