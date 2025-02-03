const Loan = require('../../../models/Loan'); 
const Employee = require('../../../models/Employee'); 
const Salary = require('../../../models/EmployeeSetSalary');
const createLoanValidator = require('../../../validators/EmployeeSetSalary/LoanValidator'); 

async function createLoan(req, res) {
  const { error, value } = createLoanValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, loanOption, title, type, amount, reason } = value;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const newLoan = new Loan({
      employeeId,
      employeeName,
      loanOption,
      title,
      type,
      amount,
      reason,
    });

    await newLoan.save();

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
      message: 'Loan record created successfully, and grandTotal updated in Salary model.',
      data: newLoan,
      salary: salary,
    });
  } catch (error) {
    console.error('Error creating loan record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the loan record.' });
  }
}

module.exports = createLoan;
