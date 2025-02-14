const MarkedAttendance = require("../../../../models/MarkedAttendance");

async function getAttendance(req, res) {
  try {
    const { startDate, endDate, employeeId } = req.query;

    const filter = {};

    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : new Date("1970-01-01");
      const end = endDate ? new Date(endDate) : new Date();

      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({
          hasError: true,
          message: "Invalid startDate or endDate format.",
        });
      }

      filter.date = {
        $gte: start,
        $lte: end,
      };
    }

    if (employeeId) {
      filter.employeeId = employeeId;
    }

    const records = await MarkedAttendance.find(filter)
      .populate({
        path: "employeeId",
        select: "name email designation",
      })
      .exec();

    if (!records.length) {
      return res.status(404).json({
        hasError: true,
        message: "No records found for the given parameters.",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Records fetched successfully",
      data: records,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ hasError: true, message: "Server error", error: error.message });
  }
}

module.exports = getAttendance;
