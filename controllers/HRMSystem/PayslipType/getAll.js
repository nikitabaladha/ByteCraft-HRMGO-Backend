const PayslipType = require("../../../models/PayslipType");

async function getAll(req, res) {
  try {
   
    const payslipTypes = await PayslipType.find();

    if (payslipTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Payslip Type found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Payslip Types fetched successfully",
      data: payslipTypes,
    });
  } catch (error) {
    console.error("Error fetching payslip types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
