const Overtime = require('../../../models/Overtime');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');

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

 
    const oldAmount = overtime.amount;


    overtime.employeeName = employeeName;
    overtime.title = title;
    overtime.numberOfDays = numberOfDays;
    overtime.hours = hours;
    overtime.amount = amount;

    await overtime.save();

    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for the employee.' });
    }

    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0;
    }

   
    const amountDifference = amount - oldAmount;


    const updatedGrandTotal = salary.grandTotal + amountDifference;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;

    await salary.save();

    return res.status(200).json({
      message: 'Overtime record updated successfully, and grandTotal updated in Salary model.',
      data: overtime,
      salary,
    });
  } catch (error) {
    console.error('Error updating overtime record:', error);
    return res.status(500).json({ error: 'An error occurred while updating the overtime record.' });
  }
}

module.exports = updateOvertime;
