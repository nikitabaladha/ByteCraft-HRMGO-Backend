// controllers/Complaint/getAll.js
const Complaint = require("../../../models/Complaint");

async function getAll(req, res) {
  try {
    const complaints = await Complaint.find()
      .populate("complaintFromId", "name")
      .populate("complaintAgainstId", "name");

    if (!complaints.length) {
      return res.status(404).json({
        hasError: true,
        message: "No Complaints found",
        data: [],
      });
    }

    const formedComplaints = complaints.map((complaint) => ({
      complaintFrom: complaint.complaintFromId?.name || "Unknown",
      complaintAgainst: complaint.complaintAgainstId?.name || "Unknown",
      complaintAgainstId: complaint.complaintAgainstId,
      title: complaint.title,
      complaintDate: complaint.complaintDate,
      complaintAgainstId: complaint.complaintAgainstId._id,
      description: complaint.description,
      id: complaint._id,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Complaints retrieved successfully",
      data: formedComplaints,
    });
  } catch (error) {
    console.error("Error in getAll API:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = getAll;
