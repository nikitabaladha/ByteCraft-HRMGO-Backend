const Otherpayment = require('../../../models/Otherpayment');

async function getOtherpaymentByEmployeeId(req, res) {
  const { employeeId } = req.params;

  try {
    const otherpayments = await Otherpayment.find({ employeeId });

    if (otherpayments.length === 0) {
      return res.status(404).json({ error: 'No other deduction records found for this employee.' });
    }

    return res.status(200).json({
      message: 'other deduction  records retrieved successfully.',
      data: otherpayments,
    });
  } catch (error) {
    console.error('Error fetching other deduction  records:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the other deduction  records.' });
  }
}

module.exports = getOtherpaymentByEmployeeId;
