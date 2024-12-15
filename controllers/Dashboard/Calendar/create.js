// controllers/Calendar/create.js
const Calendar = require("../../../models/Calendar");
const CalendarValidator = require("../../../validators/DashboardValidators/CalendarValidator");

async function create(req, res) {
  try {
    const { title, startDate, endDate, description, color } = req.body;

    const userId = req.user.id;

    const { error } = CalendarValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const newCalendar = new Calendar({
      title,
      startDate,
      endDate,
      description,
      userId,
      color,
    });

    await newCalendar.save();

    return res.status(201).json({
      hasError: false,
      message: "Calendar created successfully",
      data: newCalendar,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
