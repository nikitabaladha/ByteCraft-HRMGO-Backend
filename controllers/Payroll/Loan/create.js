const Loan = require('../../../models/Loan'); 
const Employee = require('../../../models/Employee'); 
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

    return res.status(201).json({
      message: 'Loan record created successfully.',
      data: newLoan,
    });
  } catch (error) {
    console.error('Error creating loan record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the loan record.' });
  }
}

module.exports = createLoan;
