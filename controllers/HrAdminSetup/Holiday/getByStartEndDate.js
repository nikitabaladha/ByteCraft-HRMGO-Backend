const Holiday = require("../../../models/Holiday");

async function getByStartEndDate(req, res) {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate) query.startDate = { $gte: new Date(startDate) };
    if (endDate) query.endDate = { $lte: new Date(endDate) };

    const holidays = await Holiday.find(query);

    if (!holidays.length) {
      return res.status(404).json({
        hasError: true,
        message: "No Holidays found for the given criteria",
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
    console.error("Error in get By Start End Date API:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = getByStartEndDate;
