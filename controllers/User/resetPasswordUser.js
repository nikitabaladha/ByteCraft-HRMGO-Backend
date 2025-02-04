const User = require("../../models/User");
const saltFunction = require("../../validators/saltFunction");
 
async function resetPasswordUser(req, res) {
  try {
    const { userId, newPassword } = req.body;
 
    if (!userId || !newPassword) {
      return res
        .status(400)
        .json({ hasError: true, message: "All fields are required" });
    }
 
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ hasError: true, message: "User not found" });
    }
 
    const { hashedPassword, salt } = saltFunction.hashPassword(newPassword);
 
   
    user.password = hashedPassword;
    user.salt = salt;
    user.passwordSwitch = true;
    await user.save();
 
    return res.status(200).json({
      hasError: false,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}
 
module.exports = resetPasswordUser;