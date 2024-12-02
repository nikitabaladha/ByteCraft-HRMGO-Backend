// controllers/Announcement/delete.js
const Announcement = require("../../../models/Announcement");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Announcement deleted successfully",
      data: announcement,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
