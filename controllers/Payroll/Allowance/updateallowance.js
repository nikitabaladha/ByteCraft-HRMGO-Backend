const Allowance = require('../../../models/Allowance');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');
const updateAllowanceValidator = require('../../../validators/EmployeeSetSalary/AllowanceValidator');

async function updateAllowance(req, res) {
  const { error, value } = updateAllowanceValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, allowanceOption, title, type, amount } = value;
  const { allowanceId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    let allowance = await Allowance.findById(allowanceId);
    if (!allowance) {
      return res.status(404).json({ error: 'Allowance record not found.' });
    }

    const amountDifference = amount - allowance.amount;

    allowance.employeeName = employeeName;
    allowance.allowanceOption = allowanceOption;
    allowance.title = title;
    allowance.type = type;
    allowance.amount = amount;

    await allowance.save();

    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for the employee.' });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal + amountDifference;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    return res.status(200).json({
      message: 'Allowance record updated successfully, and grandTotal updated in Salary model.',
      data: allowance,
      salary,
    });
  } catch (error) {
    console.error('Error updating allowance record:', error);
    return res.status(500).json({ error: 'An error occurred while updating the allowance record.' });
  }
}

module.exports = updateAllowance;
