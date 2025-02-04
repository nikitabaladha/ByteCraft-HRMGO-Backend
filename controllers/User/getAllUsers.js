const User = require("../../models/User");

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, { password: 0, salt: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ hasError: true, message: "No users found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = getAllUsers;
