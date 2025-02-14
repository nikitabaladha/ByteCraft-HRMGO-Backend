const Allowance = require('../../../models/Allowance');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');
const createAllowanceValidator = require('../../../validators/EmployeeSetSalary/AllowanceValidator');

async function createAllowance(req, res) {
  const { error, value } = createAllowanceValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, allowanceOption, title, type, amount } = value;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const newAllowance = new Allowance({
      employeeId,
      employeeName,
      allowanceOption,
      title,
      type,
      amount,
    });

    await newAllowance.save();

    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for the employee.' });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal + amount;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    return res.status(201).json({
      message: 'Allowance record created successfully, and grandTotal updated in Salary model.',
      data: newAllowance,
      salary: salary,
    });
  } catch (error) {
    console.error('Error creating allowance record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the allowance record.' });
  }
}

module.exports = createAllowance;
