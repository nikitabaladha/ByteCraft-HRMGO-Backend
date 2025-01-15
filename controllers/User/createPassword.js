const User = require("../../models/User");
const saltFunction = require("../../validators/saltFunction");
 
async function createPassword(req, res) {
  try {
    const { userId, newPassword } = req.body;
 
    // Validate input
    if (!userId || !newPassword) {
      return res.status(400).json({
        hasError: true,
        message: "User ID and new password are required",
      });
    }
 
    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        hasError: true,
        message: "User not found",
      });
    }
 
    // Check if the user already has a password set
    if (user.passwordSwitch) {
      return res.status(400).json({
        hasError: true,
        message: "Password is already set for this user",
      });
    }
 
    // Hash the new password
    const { hashedPassword, salt } = saltFunction.hashPassword(newPassword);
 
    // Update the user's password, salt, and passwordSwitch
    user.password = hashedPassword;
    user.salt = salt;
    user.passwordSwitch = true; // Indicate that the password is now set
    await user.save();
 
    // Respond with success
    return res.status(200).json({
      hasError: false,
      message: "Password created successfully",
    });
  } catch (error) {
    console.error("Error in createPassword API:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}
 
module.exports = createPassword;