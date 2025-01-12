const User = require("../../models/User");

async function updateUser(req, res) {
  try {
    const { id } = req.params; 
    const { name, email, role, profileImage } = req.body; 

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ hasError: true, message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    return res.status(200).json({
      hasError: false,
      message: "User updated successfully",
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

module.exports = updateUser;
