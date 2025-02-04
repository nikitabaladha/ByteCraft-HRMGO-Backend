const Loan = require('../../../models/Loan');

async function getLoanByEmployeeId(req, res) {
  const { employeeId } = req.params;

  try {
    const loans = await Loan.find({ employeeId });

    if (loans.length === 0) {
      return res.status(404).json({ error: 'No loan records found for this employee.' });
    }

    return res.status(200).json({
      message: 'Loan records retrieved successfully.',
      data: loans,
    });
  } catch (error) {
    console.error('Error fetching loan records:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the loan records.' });
  }
}

module.exports = getLoanByEmployeeId;
