// controllers/Holiday/update.js
const Holiday = require("../../../models/Holiday");
const HolidayValidator = require("../../../validators/HrAdminSetupValidators/Holiday.js");

async function updateById(req, res) {
  try {
    const { id } = req.params;
    const { occasion, startDate, endDate } = req.body;

    const { error } = HolidayValidator.HolidayUpdateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const holiday = await Holiday.findById(id);
    if (!holiday) {
      return res
        .status(404)
        .json({ hasError: true, message: "Holiday not found" });
    }

    // Update fields only if provided in the request body
    if (occasion !== undefined) holiday.occasion = occasion;
    if (startDate !== undefined) holiday.startDate = startDate;
    if (endDate !== undefined) holiday.endDate = endDate;

    // Save the updated Holiday
    const updatedHoliday = await holiday.save();

    return res.status(200).json({
      hasError: false,
      message: "Holiday updated successfully",
      data: updatedHoliday,
    });
  } catch (error) {
    console.error("Error while updating holiday:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error.",
      error: error.message,
    });
  }
}

module.exports = updateById;
