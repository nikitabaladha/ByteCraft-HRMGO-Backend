const Loan = require('../../../models/Loan');
const Salary = require('../../../models/EmployeeSetSalary');

async function deleteLoan(req, res) {
  const { id } = req.params;

  try {
    const deletedLoan = await Loan.findByIdAndDelete(id);

    if (!deletedLoan) {
      return res.status(404).json({
        message: 'Loan not found',
      });
    }

    const salary = await Salary.findOne({ employeeId: deletedLoan.employeeId });

    if (!salary) {
      return res.status(404).json({
        message: 'Salary record not found for the employee.',
      });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal + deletedLoan.amount;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    res.status(200).json({
      message: 'Loan deleted successfully and grandTotal updated.',
      data: deletedLoan,
      salary: salary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the loan',
      error: error.message,
    });
  }
}

module.exports = deleteLoan;
