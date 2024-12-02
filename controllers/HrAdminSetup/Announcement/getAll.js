const Announcement = require("../../../models/Announcement");

async function getAll(req, res) {
  try {
    // Fetch announcements and populate related fields
    const announcements = await Announcement.find()
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName")
      .populate("employeeId", "name email");

    if (!announcements.length) {
      return res.status(404).json({
        hasError: true,
        message: "No Announcements found",
        data: [],
      });
    }

    // Map data into the desired structure
    const formedAnnouncements = announcements.map((announcement) => ({
      id: announcement._id,
      title: announcement.title,
      branchId: announcement.branchId._id,
      branchName: announcement.branchId.branchName,
      departmentId: announcement.departmentId._id,
      departmentName: announcement.departmentId.departmentName,
      employees: announcement.employeeId.map((employee) => ({
        id: employee._id,
        name: employee.name,
        email: employee.email,
      })),
      startDate: announcement.startDate,
      endDate: announcement.endDate,
      description: announcement.description,
    }));

    // Send the response
    return res.status(200).json({
      hasError: false,
      message: "Announcements retrieved successfully",
      data: formedAnnouncements,
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
