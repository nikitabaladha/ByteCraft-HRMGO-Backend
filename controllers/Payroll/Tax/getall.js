const Tax = require('../../../models/Tax');

async function getTaxByEmployeeId(req, res) {
  const { employeeId } = req.params;

  try {
    const taxes = await Tax.find({ employeeId });

    if (taxes.length === 0) {
      return res.status(404).json({ error: 'No tax records found for this employee.' });
    }

    return res.status(200).json({
      message: 'Tax records retrieved successfully.',
      data: taxes,
    });
  } catch (error) {
    console.error('Error fetching tax records:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the tax records.' });
  }
}

module.exports = getTaxByEmployeeId;
