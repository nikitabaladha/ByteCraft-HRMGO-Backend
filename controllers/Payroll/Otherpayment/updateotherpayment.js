const OtherPayment = require('../../../models/Otherpayment');
const Employee = require('../../../models/Employee');

async function updateOtherPayment(req, res) {
  const { employeeId, employeeName, title, type, amount } = req.body;
  const { otherPaymentId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    let otherPayment = await OtherPayment.findById(otherPaymentId);
    if (!otherPayment) {
      return res.status(404).json({ error: 'Other Payment record not found.' });
    }

    otherPayment.employeeName = employeeName;
    otherPayment.title = title;
    otherPayment.type = type;
    otherPayment.amount = amount;

    await otherPayment.save();

    return res.status(200).json({
      message: 'Other Payment record updated successfully.',
      data: otherPayment,
    });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the Other Payment record.' });
  }
}

module.exports = updateOtherPayment;
