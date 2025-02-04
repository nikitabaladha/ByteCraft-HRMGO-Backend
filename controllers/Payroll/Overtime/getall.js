const Overtime = require('../../../models/Overtime');

async function getOvertimeByEmployeeId(req, res) {
  const { employeeId } = req.params;

  try {
    const overtimeRecords = await Overtime.find({ employeeId });

    if (overtimeRecords.length === 0) {
      return res.status(404).json({ error: 'No overtime records found for this employee.' });
    }

    return res.status(200).json({
      message: 'Overtime records retrieved successfully.',
      data: overtimeRecords,
    });
  } catch (error) {
    console.error('Error fetching overtime records:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the overtime records.' });
  }
}

module.exports = getOvertimeByEmployeeId;
