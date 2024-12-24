const Tax = require('../../../models/Tax');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');
const updateTaxValidator = require('../../../validators/EmployeeSetSalary/TaxValidator');

async function updateTax(req, res) {
  const { error, value } = updateTaxValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, taxes, title, type, amount } = value;
  const { taxId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    let tax = await Tax.findById(taxId);
    if (!tax) {
      return res.status(404).json({ error: 'Tax record not found.' });
    }

    const amountDifference = amount - tax.amount;

    tax.employeeName = employeeName;
    tax.taxes = taxes;
    tax.title = title;
    tax.type = type;
    tax.amount = amount;

    await tax.save();

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
      message: 'Tax record updated successfully, and grandTotal updated in Salary model.',
      data: tax,
      salary,
    });
  } catch (error) {
    console.error('Error updating tax record:', error);
    return res.status(500).json({ error: 'An error occurred while updating the tax record.' });
  }
}

module.exports = updateTax;
