const User = require("../../models/User");

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ hasError: true, message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      hasError: false,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteUser;
