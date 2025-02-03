const Allowance = require('../../../models/Allowance');
const Salary = require('../../../models/EmployeeSetSalary');

async function deleteAllowance(req, res) {
  const { id } = req.params;

  try {
    const deletedAllowance = await Allowance.findByIdAndDelete(id);

    if (!deletedAllowance) {
      return res.status(404).json({
        message: 'Allowance not found',
      });
    }

    const salary = await Salary.findOne({ employeeId: deletedAllowance.employeeId });

    if (!salary) {
      return res.status(404).json({
        message: 'Salary record not found for the employee.',
      });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal - deletedAllowance.amount;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    res.status(200).json({
      message: 'Allowance deleted successfully and grandTotal updated.',
      data: deletedAllowance,
      salary: salary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the allowance',
      error: error.message,
    });
  }
}

module.exports = deleteAllowance;
