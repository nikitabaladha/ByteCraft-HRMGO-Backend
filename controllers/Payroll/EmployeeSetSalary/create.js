// const Salary = require('../../../models/EmployeeSetSalary');
// const Employee = require('../../../models/Employee');
// const salarySchema = require('../../../validators/Payrollvalidators/Employeesetsalaryvalidators');

// async function create(req, res) {
//   const { error, value } = salarySchema.validate(req.body);

//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   const { employeeId, salaryType, salary } = value;

//   try {
//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     const existingSalary = await Salary.findOne({ employeeId });
//     if (existingSalary) {
//       return res.status(409).json({ error: 'Salary record for this employee already exists' });
//     }

//     const newSalary = new Salary({
//       employeeId,
//       salaryType,
//       salary,
//     });

//     await newSalary.save();

//     res.status(201).json({
//       message: 'Salary record created successfully',
//       data: newSalary,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(409).json({ error: 'Duplicate salary record detected for this employee' });
//     }

//     res.status(500).json({ error: 'Salary record for this employee already exists' });
//   }
// }

// module.exports = create;

const Salary = require('../../../models/EmployeeSetSalary');
const Employee = require('../../../models/Employee');
const salarySchema = require('../../../validators/Payrollvalidators/Employeesetsalaryvalidators');

async function create(req, res) {
  const { error, value } = salarySchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, salaryType, salary, grandTotal,  status } = value;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const existingSalary = await Salary.findOne({ employeeId });
    if (existingSalary) {
      return res.status(409).json({ error: 'Salary record for this employee already exists' });
    }

    const newSalary = new Salary({
      employeeId,
      salaryType,
      salary,
      grandTotal,
      status
    });

    await newSalary.save();

    res.status(201).json({
      message: 'Salary record created successfully',
      data: newSalary,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Duplicate salary record detected for this employee' });
    }

    res.status(500).json({ error: 'An error occurred while creating the salary record' });
  }
}

module.exports = create;

