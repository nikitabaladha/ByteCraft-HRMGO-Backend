// controllers/Complaint/create.js
const Complaint = require("../../../models/Complaint");
const ComplaintValidator = require("../../../validators/HrAdminSetupValidators/Complaint.js");

async function create(req, res) {
  try {
    const { error } = ComplaintValidator.ComplaintCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const {
      complaintFromId,
      complaintAgainstId,
      title,
      complaintDate,
      description,
    } = req.body;

    const existingComplaint = await Complaint.findOne({
      complaintFromId,
      complaintAgainstId,
      complaintDate,
    });

    if (existingComplaint) {
      return res.status(400).json({
        hasError: true,
        message: "Complaint already exists for this employee",
      });
    }

    const newComplaint = new Complaint({
      complaintFromId,
      complaintAgainstId,
      title,
      complaintDate,
      description,
    });

    await newComplaint.save();

    return res.status(201).json({
      hasError: false,
      message: "Complaint created successfully",
      data: newComplaint,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = create;
