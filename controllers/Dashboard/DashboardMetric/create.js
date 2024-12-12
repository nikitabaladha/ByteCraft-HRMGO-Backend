// controllers/DashboardMetric/create.js
const DashboardMetric = require("../../../models/DashboardMetric");
const DashboardMetricValidator = require("../../../validators/DashboardValidators/DashboardMetricValidator");

async function create(req, res) {
  try {
    const { title, subtitle, value } = req.body;
    const userId = req.user.id;

    const { error } = DashboardMetricValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    const newMetric = new DashboardMetric({
      userId,
      title,
      subtitle,
      value,
    });

    await newMetric.save();

    return res.status(201).json({
      hasError: false,
      message: "Dashboard metric created successfully",
      data: newMetric,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
