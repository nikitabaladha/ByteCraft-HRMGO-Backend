const Payroll = require("../../../models/EmployeeSetSalary");
const Employee = require('../../../models/Employee');

const payslipstatusupdateByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const payroll = await Payroll.findOne({ employeeId });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found for the given employee ID.' });
    }

    if (payroll.status === 'paid') {
      return res.status(400).json({ message: 'Payslip is already marked as paid.' });
    }

    payroll.status = 'paid';
    payroll.updatedAt = new Date();
    await payroll.save();

    res.status(200).json({
      message: 'Payslip status updated successfully.',
      data: payroll,
    });
  } catch (error) {
    console.error('Error updating payslip status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = payslipstatusupdateByEmployee;
