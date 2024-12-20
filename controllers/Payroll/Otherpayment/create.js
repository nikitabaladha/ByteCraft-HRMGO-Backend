const Otherpayment = require('../../../models/Otherpayment');
const Employee = require('../../../models/Employee');

async function createOtherpayment(req, res) {
  const { employeeId, employeeName, title, type, amount } = req.body;

  try {
   
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }


    const newOtherPayment = new Otherpayment({
      employeeId,
      employeeName,
      title,
      type,
      amount
    });

   
    await newOtherPayment.save();

    return res.status(201).json({
      message: 'OtherDeduction record created successfully.',
      data: Otherpayment,
    });
  } catch (error) {
    console.error('Error creating OtherDeduction record:', error);
    return res.status(500).json({ error: 'An error occurred while creating the OtherDeduction record.' });
  }
}

module.exports = createOtherpayment;
