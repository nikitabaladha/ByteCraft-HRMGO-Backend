// controllers/Holiday/create.js
const Holiday = require("../../../models/Holiday");

const HolidayValidator = require("../../../validators/HrAdminSetupValidators/Holiday.js");

async function create(req, res) {
  try {
    const { occasion, startDate, endDate } = req.body;

    const { error } = HolidayValidator.HolidayCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const existingHoliday = await Holiday.findOne({
      occasion,
      startDate,
      endDate,
    });

    if (existingHoliday) {
      return res.status(409).json({
        hasError: true,
        message: "Holiday with the same details already exists.",
      });
    }

    const newHoliday = new Holiday({
      occasion,
      startDate,
      endDate,
    });

    await newHoliday.save();

    return res.status(201).json({
      hasError: false,
      message: "Holiday created successfully",
      data: newHoliday,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
