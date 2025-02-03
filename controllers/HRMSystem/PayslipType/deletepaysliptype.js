const PayslipType = require("../../../models/PayslipType");

async function deletePayslipType(req, res) {
  const { id } = req.params;

  try {
    const deletedPayslipType = await PayslipType.findByIdAndDelete(id);

    if (!deletedPayslipType) {
      return res.status(404).json({
        message: 'Payslip Type not found',
      });
    }

    res.status(200).json({
      message: 'Payslip Type deleted successfully',
      data: deletedPayslipType,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the payslip type',
      error: error.message,
    });
  }
}

module.exports = deletePayslipType;
