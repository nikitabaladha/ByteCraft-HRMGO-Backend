const PayslipType = require("../../../models/PayslipType");

async function update(req, res) {
  try {
    const { payslipType } = req.body;
    const { id } = req.params;

    if (!payslipType) {
      return res.status(400).json({ message: "Payslip Type is required." });
    }

    const payslipTypeRecord = await PayslipType.findById(id);

    if (!payslipTypeRecord) {
      return res.status(404).json({ message: "Payslip Type not found." });
    }

    payslipTypeRecord.payslipType = payslipType;

    await payslipTypeRecord.save();

    return res.status(200).json({
      message: "Payslip Type updated successfully!",
      payslipType: payslipTypeRecord,
    });
  } catch (error) {
    console.error("Error updating payslip type:", error);
    return res.status(500).json({
      message: "Failed to update payslip type.",
      error: error.message,
    });
  }
}

module.exports = update;
