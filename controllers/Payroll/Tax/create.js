const Tax = require('../../../models/Tax');
const Employee = require('../../../models/Employee');
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

    return res.status(201).json({
      message: 'Tax record created successfully.',
      data: newTax,
    });
  } catch (error) {
    console.error('Error creating tax record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the tax record.' });
  }
}

module.exports = createTax;
