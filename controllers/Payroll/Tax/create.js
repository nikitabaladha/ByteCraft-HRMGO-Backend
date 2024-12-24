const Tax = require('../../../models/Tax');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');
const createTaxValidator = require('../../../validators/EmployeeSetSalary/TaxValidator');

async function createTax(req, res) {
  const { error, value } = createTaxValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, taxes, title, type, amount } = value;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const newTax = new Tax({
      employeeId,
      employeeName,
      taxes,
      title,
      type,
      amount,
    });

    await newTax.save();

    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for the employee.' });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal - amount; 

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    return res.status(201).json({
      message: 'Tax record created successfully, and grandTotal updated in Salary model.',
      data: newTax,
      salary: salary,
    });
  } catch (error) {
    console.error('Error creating tax record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the tax record.' });
  }
}

module.exports = createTax;
