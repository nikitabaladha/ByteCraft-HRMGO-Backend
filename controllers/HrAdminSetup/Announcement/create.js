const Announcement = require("../../../models/Announcement");

const AnnouncementValidator = require("../../../validators/HrAdminSetupValidators/Announcement.js");

async function create(req, res) {
  try {
    const {
      title,
      branchId,
      departmentId,
      employeeId,
      startDate,
      endDate,
      description,
    } = req.body;

    const { error } =
      AnnouncementValidator.AnnouncementCreateValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const employeeIds = Array.isArray(employeeId) ? employeeId : [employeeId];

    const uniqueEmployeeIds = [...new Set(employeeIds)];
    if (uniqueEmployeeIds.length !== employeeIds.length) {
      return res.status(400).json({
        message: "Duplicate employee IDs are not allowed.",
      });
    }

    const newAnnouncement = new Announcement({
      title,
      branchId,
      departmentId,
      employeeId: uniqueEmployeeIds,
      startDate,
      endDate,
      description,
    });

    await newAnnouncement.save();

    return res.status(201).json({
      hasError: false,
      message: "Announcement created successfully",
      data: newAnnouncement,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
