const User = require("../../models/User");

async function getUserDetails(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password -salt");

    if (!user) {
      return res
        .status(404)
        .json({ hasError: true, message: "User not found" });
    }
    console.log("user", user);

    const responseData = {
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    };

    return res.status(200).json({
      data: responseData,
      hasError: false,
      message: "User details fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = getUserDetails;
