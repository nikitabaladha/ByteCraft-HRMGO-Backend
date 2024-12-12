// controllers/Complaint/update.js
const Complaint = require("../../../models/Complaint");
const ComplaintValidator = require("../../../validators/HrAdminSetupValidators/Complaint.js");

async function updateById(req, res) {
  try {
    const { id } = req.params;
    const { complaintAgainstId, title, complaintDate, description } = req.body;

    const { error } = ComplaintValidator.ComplaintUpdateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({
        hasError: true,
        message: "Complaint not found",
      });
    }

    complaint.complaintAgainstId =
      complaintAgainstId || complaint.complaintAgainstId;
    complaint.title = title || complaint.title;
    complaint.complaintDate = complaintDate || complaint.complaintDate;
    complaint.description = description || complaint.description;

    await complaint.save();

    return res.status(200).json({
      hasError: false,
      message: "Complaint updated successfully",
      data: complaint,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = updateById;
