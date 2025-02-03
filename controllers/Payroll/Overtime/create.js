const Overtime = require('../../../models/Overtime');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');

async function createOvertime(req, res) {
  const { employeeId, employeeName, title, numberOfDays, hours, amount } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    // const totalOvertimeAmount = numberOfDays * hours * amount;

    const newOvertime = new Overtime({
      employeeId,
      employeeName,
      title,
      numberOfDays,
      hours,
      amount,
      amount,
    });

    await newOvertime.save();

    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for the employee.' });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

    const updatedGrandTotal = salary.grandTotal + amount;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    return res.status(201).json({
      message: 'Overtime record created successfully, and grandTotal updated in Salary model.',
      data: newOvertime,
      salary: salary,
    });
  } catch (error) {
    console.error('Error creating overtime record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the overtime record.' });
  }
}

module.exports = createOvertime;
