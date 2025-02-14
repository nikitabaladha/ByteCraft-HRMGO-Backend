const Salary = require("../../../models/EmployeeSetSalary");
const Employee = require('../../../models/Employee');

const updatestatusinactive = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ message: 'Salary record not found for the given employee ID.' });
    }

    if (salary.status === 'inactive') {
      return res.status(400).json({ message: 'Salary status is already inactive.' });
    }

    salary.status = 'inactive';
    salary.updatedAt = new Date();

    await salary.save();

    res.status(200).json({
      message: 'Salary status updated to inactive successfully.',
      data: salary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = updatestatusinactive;
