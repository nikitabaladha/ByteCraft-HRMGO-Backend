const User = require("../../models/User");

const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const existingUser = await User.findById(userId).select("-password -salt");

    if (!existingUser) {
      return res.status(404).json({
        hasError: true,
        message: "User not found",
      });
    }

    if (!name && !email && !req.files?.profileImage) {
      return res.status(400).json({
        hasError: true,
        message: "No fields to update provided",
      });
    }

    if (req.files?.profileImage) {
      existingUser.profileImage = `/Images/profileImage/${req.files.profileImage[0].filename}`;
    }

    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;

    await existingUser.save();

    return res.status(200).json({
      message: "User details updated successfully",
      hasError: false,
      data: {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        profileImage: existingUser.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = updateUserDetails;
