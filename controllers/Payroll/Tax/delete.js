const Tax = require('../../../models/Tax');
const Salary = require('../../../models/EmployeeSetSalary');

async function deleteTax(req, res) {
  const { id } = req.params;

  try {
    const deletedTax = await Tax.findByIdAndDelete(id);

    if (!deletedTax) {
      return res.status(404).json({
        message: 'Tax record not found',
      });
    }

    const salary = await Salary.findOne({ employeeId: deletedTax.employeeId });

    if (!salary) {
      return res.status(404).json({
        message: 'Salary record not found for the employee.',
      });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal + deletedTax.amount;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    res.status(200).json({
      message: 'Tax record deleted successfully and grandTotal updated.',
      data: deletedTax,
      salary: salary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the Tax record',
      error: error.message,
    });
  }
}

module.exports = deleteTax;
