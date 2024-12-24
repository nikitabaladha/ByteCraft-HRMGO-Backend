const Commission = require('../../../models/Commission');
const Salary = require('../../../models/EmployeeSetSalary');

async function deleteCommission(req, res) {
  const { id } = req.params;

  try {
    const deletedCommission = await Commission.findByIdAndDelete(id);

    if (!deletedCommission) {
      return res.status(404).json({
        message: 'Commission not found',
      });
    }

    const salary = await Salary.findOne({ employeeId: deletedCommission.employeeId });

    if (!salary) {
      return res.status(404).json({
        message: 'Salary record not found for the employee.',
      });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal - deletedCommission.amount;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    res.status(200).json({
      message: 'Commission deleted successfully and grandTotal updated.',
      data: deletedCommission,
      salary: salary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the commission',
      error: error.message,
    });
  }
}

module.exports = deleteCommission;
