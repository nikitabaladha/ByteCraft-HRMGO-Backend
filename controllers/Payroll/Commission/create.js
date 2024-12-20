const Commission = require('../../../models/Commission');
const Employee = require('../../../models/Employee');
const createCommissionValidator = require('../../../validators/EmployeeSetSalary/CommissionValidator'); 

async function createCommission(req, res) {
  const { error, value } = createCommissionValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, title, type, amount } = value;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const newCommission = new Commission({
      employeeId,
      employeeName,
      title,
      type,
      amount,
    });

    await newCommission.save();

    return res.status(201).json({
      message: 'Commission record created successfully.',
      data: newCommission,
    });
  } catch (error) {
    console.error('Error creating commission record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the commission record.' });
  }
}

module.exports = createCommission;
