const Allowance = require('../../../models/Allowance');

async function getAllowanceByEmployeeId(req, res) {
  const { employeeId } = req.params;

  try {
    const allowance = await Allowance.find({ employeeId });

    if (allowance.length === 0) {
      return res.status(404).json({ error: 'No allowance records found for this employee.' });
    }

    return res.status(200).json({
      message: 'Allowance records retrieved successfully.',
      data: allowance,
    });
  } catch (error) {
    console.error('Error fetching allowance records:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the allowance records.' });
  }
}

module.exports = getAllowanceByEmployeeId;
