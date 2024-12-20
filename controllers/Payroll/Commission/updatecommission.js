const Commission = require('../../../models/Commission');
const Employee = require('../../../models/Employee');
const updateCommissionValidator = require('../../../validators/EmployeeSetSalary/CommissionValidator');

async function updateCommission(req, res) {
  const { error, value } = updateCommissionValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, title, type, amount } = value;
  const { commissionId } = req.params; 

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    let commission = await Commission.findById(commissionId);
    if (!commission) {
      return res.status(404).json({ error: 'Commission record not found.' });
    }

    commission.employeeName = employeeName;
    commission.title = title;
    commission.type = type;
    commission.amount = amount;

    await commission.save();

    return res.status(200).json({
      message: 'Commission record updated successfully.',
      data: commission,
    });
  } catch (error) {
    console.error('Error updating commission record:', error);
    return res.status(500).json({ error: 'An error occurred while updating the commission record.' });
  }
}

module.exports = updateCommission;
