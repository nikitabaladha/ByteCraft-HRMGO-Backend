const User = require("../../models/User");
const saltFunction = require("../../validators/saltFunction.js");
const signupValidationSchema = require("../../validators/signupValidationSchema.js");

async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const { error } = signupValidationSchema.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    let isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res
        .status(400)
        .json({ hasError: true, message: "User already exists" });
    }

    let hashedPassword = null;
    let salt = null;

    if (password) {
      const passwordData = saltFunction.hashPassword(password);
      hashedPassword = passwordData.hashedPassword;
      salt = passwordData.salt;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      passwordSwitch: !!password,
      role,
      salt: salt || "", 
      profileImage: "/Images/profileImage/default_avatar.png",
    });

    return res.status(200).json({
      hasError: false,
      message: "Signup successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = signup;

