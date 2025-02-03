const Salary = require('../../../models/EmployeeSetSalary');
const Employee = require('../../../models/Employee');
const salarySchema = require('../../../validators/Payrollvalidators/Employeesetsalaryvalidators');

const validSalaryTypes = ['Monthly Payslip', 'Hourly Payslip', ];

async function UpdatenetSalary(req, res) {
  const { error, value } = salarySchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, salaryType, salary, grandTotal } = value;

  try {
    if (!validSalaryTypes.includes(salaryType)) {
      return res.status(400).json({
        error: `Invalid salary type. Valid types are: ${validSalaryTypes.join(', ')}`,
      });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const existingSalary = await Salary.findOne({ employeeId });
    if (existingSalary) {
      existingSalary.grandTotal = grandTotal;
      await existingSalary.save();

      return res.status(200).json({
        message: 'Grand total updated successfully',
        data: existingSalary,
      });
    } else {
      return res.status(404).json({ error: 'Salary record not found for this employee' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while processing the salary record' });
  }
}

module.exports = UpdatenetSalary;
