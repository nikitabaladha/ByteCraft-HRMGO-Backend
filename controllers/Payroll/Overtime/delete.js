const Overtime = require('../../../models/Overtime');
const Salary = require('../../../models/EmployeeSetSalary');

async function deleteOvertime(req, res) {
  const { id } = req.params;

  try {
    const deletedOvertime = await Overtime.findByIdAndDelete(id);

    if (!deletedOvertime) {
      return res.status(404).json({
        message: 'Overtime record not found',
      });
    }

    const salary = await Salary.findOne({ employeeId: deletedOvertime.employeeId });

    if (!salary) {
      return res.status(404).json({
        message: 'Salary record not found for the employee.',
      });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal - deletedOvertime.amount;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    res.status(200).json({
      message: 'Overtime record deleted successfully and grandTotal updated.',
      data: deletedOvertime,
      salary: salary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the Overtime record',
      error: error.message,
    });
  }
}

module.exports = deleteOvertime;
