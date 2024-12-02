// controllers/Holiday/delete.js
const Holiday = require("../../../models/Holiday");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const holiday = await Holiday.findByIdAndDelete(id);

    if (!holiday) {
      return res
        .status(404)
        .json({ hasError: true, message: "Holiday not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Holiday deleted successfully",
      data: holiday,
    });
  } catch (error) {
    console.error("Error while deleting holiday:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error.",
      error: error.message,
    });
  }
}

module.exports = deleteById;
