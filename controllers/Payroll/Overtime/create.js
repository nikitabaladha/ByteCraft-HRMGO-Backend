const Overtime = require('../../../models/Overtime');
const Employee = require('../../../models/Employee');

async function createOvertime(req, res) {
  const { employeeId, employeeName, title, numberOfDays, hours, amount } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const totalOvertimeAmount = numberOfDays * hours * amount;

    const newOvertime = new Overtime({
      employeeId,
      employeeName,
      title,
      numberOfDays,
      hours,
      amount,
      totalOvertimeAmount,
    });

    await newOvertime.save();

    return res.status(201).json({
      message: 'Overtime record created successfully.',
      data: newOvertime,
    });
  } catch (error) {
    console.error('Error creating overtime record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the overtime record.' });
  }
}

module.exports = createOvertime;
