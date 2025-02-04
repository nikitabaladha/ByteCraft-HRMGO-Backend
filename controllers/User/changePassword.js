const User = require("../../models/User");
const saltFunction = require("../../validators/saltFunction");
 
async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
 
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ hasError: true, message: "All fields are required" });
    }
 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ hasError: true, message: "User not found" });
    }

    const isPasswordValid = saltFunction.validatePassword(
      currentPassword,
      user.password,
      user.salt
    );
 
    if (!isPasswordValid) {
      return res.status(401).json({ hasError: true, message: "Current password is incorrect" });
    }
 
    const { hashedPassword, salt } = saltFunction.hashPassword(newPassword);
 
    user.password = hashedPassword;
    user.salt = salt;
    await user.save();
 
    return res.status(200).json({
      hasError: false,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}
 
module.exports = changePassword;