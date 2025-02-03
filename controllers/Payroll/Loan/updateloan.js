const Loan = require('../../../models/Loan');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');
const updateLoanValidator = require('../../../validators/EmployeeSetSalary/LoanValidator');

async function updateLoan(req, res) {
  const { error, value } = updateLoanValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, loanOption, title, type, amount, reason } = value;
  const { loanId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    let loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan record not found.' });
    }

    const amountDifference = amount - loan.amount;

    loan.employeeName = employeeName;
    loan.loanOption = loanOption;
    loan.title = title;
    loan.type = type;
    loan.amount = amount;
    loan.reason = reason;

    await loan.save();

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
      message: 'Loan record updated successfully, and grandTotal updated in Salary model.',
      data: loan,
      salary,
    });
  } catch (error) {
    console.error('Error updating loan record:', error);
    return res.status(500).json({ error: 'An error occurred while updating the loan record.' });
  }
}

module.exports = updateLoan;
