const OtherPayment = require('../../../models/Otherpayment');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');

async function updateOtherPayment(req, res) {
  const { employeeId, employeeName, title, type, amount } = req.body;
  const { otherPaymentId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    let otherPayment = await OtherPayment.findById(otherPaymentId);
    if (!otherPayment) {
      return res.status(404).json({ error: 'Other Payment record not found.' });
    }

    const amountDifference = amount - otherPayment.amount;

    otherPayment.employeeName = employeeName;
    otherPayment.title = title;
    otherPayment.type = type;
    otherPayment.amount = amount;

    await otherPayment.save();

    // Update the Salary grandTotal
    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for the employee.' });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

   
    const updatedGrandTotal = salary.grandTotal - amountDifference;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    return res.status(200).json({
      message: 'Other Payment record updated successfully, and grandTotal updated in Salary model.',
      data: otherPayment,
      salary,
    });
  } catch (error) {
    console.error('Error updating Other Payment record:', error);
    return res.status(500).json({ error: 'An error occurred while updating the Other Payment record.' });
  }
}

module.exports = updateOtherPayment;
