const Announcement = require("../../../models/Announcement");
const AnnouncementValidator = require("../../../validators/HrAdminSetupValidators/Announcement.js");

async function updateById(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      branchId,
      departmentId,
      employeeId,
      startDate,
      endDate,
      description,
    } = req.body;

    // Validate the input data
    const { error } =
      AnnouncementValidator.AnnouncementUpdateValidator.validate(req.body);
    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    // Find the announcement by ID
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res
        .status(404)
        .json({ hasError: true, message: "Announcement not found" });
    }

    // Update fields if provided
    if (title) announcement.title = title;
    if (branchId) announcement.branchId = branchId;
    if (departmentId) announcement.departmentId = departmentId;
    if (startDate) announcement.startDate = startDate;
    if (endDate) announcement.endDate = endDate;
    if (description) announcement.description = description;

    // Handle employeeId updates
    if (employeeId) {
      const employeeIds = Array.isArray(employeeId) ? employeeId : [employeeId];

      // Check for duplicate employeeId values
      const uniqueEmployeeIds = [...new Set(employeeIds)];
      if (uniqueEmployeeIds.length !== employeeIds.length) {
        return res.status(400).json({
          message: "Duplicate employee IDs are not allowed.",
        });
      }

      // Update employeeId with unique values
      announcement.employeeId = Array.from(
        new Set([...announcement.employeeId, ...uniqueEmployeeIds])
      );
    }

    // Save the updated announcement
    const updatedAnnouncement = await announcement.save();

    return res.status(200).json({
      hasError: false,
      message: "Announcement updated successfully",
      data: updatedAnnouncement,
    });
  } catch (error) {
    console.error("Error in updateById API:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

module.exports = updateById;
