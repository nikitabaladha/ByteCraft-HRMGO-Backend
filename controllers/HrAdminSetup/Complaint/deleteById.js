// controllers/Complaint/delete.js
const Complaint = require("../../../models/Complaint");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Complaint deleted successfully",
      data: complaint,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
