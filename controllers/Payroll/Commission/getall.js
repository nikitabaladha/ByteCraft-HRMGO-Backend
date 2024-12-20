const Commission = require('../../../models/Commission');

async function getCommissionByEmployeeId(req, res) {
  const { employeeId } = req.params;

  try {
    const commission = await Commission.find({ employeeId });

    if (commission.length === 0) {
      return res.status(404).json({ error: 'No commission records found for this employee.' });
    }

    return res.status(200).json({
      message: 'Commission records retrieved successfully.',
      data: commission,
    });
  } catch (error) {
    console.error('Error fetching commission records:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the commission records.' });
  }
}

module.exports = getCommissionByEmployeeId;
