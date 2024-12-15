const Salary = require('../../../models/EmployeeSetSalary');
const Employee = require('../../../models/Employee');

async function getSalaryByEmployeeId(req, res) {
  const { employeeId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for this employee' });
    }

    res.status(200).json({
      message: 'Salary record retrieved successfully',
      data: salary,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = getSalaryByEmployeeId;
