// controllers/Holiday/getAll.js
const Holiday = require("../../../models/Holiday");

async function getAll(req, res) {
  try {
    const holidays = await Holiday.find();

    if (!holidays.length) {
      return res.status(404).json({
        hasError: true,
        message: "No Holidays found",
        data: [],
      });
    }

    const formedHolidays = holidays.map((holiday) => ({
      occasion: holiday.occasion,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
      id: holiday._id,
    }));

    return res.status(200).json({
      hasError: false,
      message: "Holidays retrieved successfully",
      data: formedHolidays,
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
