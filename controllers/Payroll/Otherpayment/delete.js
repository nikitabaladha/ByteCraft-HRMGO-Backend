const Otherpayment = require('../../../models/Otherpayment');
const Salary = require('../../../models/EmployeeSetSalary');

async function deleteOtherPayment(req, res) {
  const { id } = req.params;

  try {
    const deletedOtherpayment = await Otherpayment.findByIdAndDelete(id);

    if (!deletedOtherpayment) {
      return res.status(404).json({
        message: 'Other deduction not found',
      });
    }

    const salary = await Salary.findOne({ employeeId: deletedOtherpayment.employeeId });

    if (!salary) {
      return res.status(404).json({
        message: 'Salary record not found for the employee.',
      });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal + deletedOtherpayment.amount;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    res.status(200).json({
      message: 'Other deduction deleted successfully and grandTotal updated.',
      data: deletedOtherpayment,
      salary: salary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the Other deduction',
      error: error.message,
    });
  }
}

module.exports = deleteOtherPayment;
