const Allowance = require('../../../models/Allowance');
const Employee = require('../../../models/Employee');
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

    return res.status(201).json({
      message: 'Allowance record created successfully.',
      data: newAllowance,
    });
  } catch (error) {
    console.error('Error creating allowance record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the allowance record.' });
  }
}

module.exports = createAllowance;
