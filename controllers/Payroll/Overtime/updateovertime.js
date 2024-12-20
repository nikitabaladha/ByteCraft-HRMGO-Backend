const Overtime = require('../../../models/Overtime');
const Employee = require('../../../models/Employee');

async function updateOvertime(req, res) {
  const { employeeId, employeeName, title, numberOfDays, hours, amount } = req.body;
  const { overtimeId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    let overtime = await Overtime.findById(overtimeId);
    if (!overtime) {
      return res.status(404).json({ error: 'Overtime record not found.' });
    }

    overtime.employeeName = employeeName;
    overtime.title = title;
    overtime.numberOfDays = numberOfDays;
    overtime.hours = hours;
    overtime.amount = amount;

    await overtime.save();

    return res.status(200).json({
      message: 'Overtime record updated successfully.',
      data: overtime,
    });
  } catch (error) {
    console.error('Error updating overtime record:', error);
    return res.status(500).json({ error: 'An error occurred while updating the overtime record.' });
  }
}

module.exports = updateOvertime;
