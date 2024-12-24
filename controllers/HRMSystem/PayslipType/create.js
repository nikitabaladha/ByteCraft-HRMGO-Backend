const PayslipType = require("../../../models/PayslipType");

async function create(req, res) {
  try {
    const { payslipType } = req.body;

    if (!payslipType) {
      return res.status(400).json({ message: "Payslip Type is required." });
    }

    const newPayslipType = new PayslipType({
      payslipType,
    });

    await newPayslipType.save();

    return res.status(201).json({
      message: "Payslip Type created successfully!",
      payslipType: newPayslipType,
    });
  } catch (error) {
    console.error("Error creating payslip type:", error);
    return res.status(500).json({
      message: "Failed to create payslip type.",
      error: error.message,
    });
  }
}

module.exports = create;
