const Salary = require('../../../models/EmployeeSetSalary');

async function getGrandTotal(req, res) {
  const { employeeId } = req.params;

  try {
    const salary = await Salary.findOne({ employeeId }, { grandTotal: 1, _id: 0 });

    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for this employee' });
    }

    res.status(200).json({ grandTotal: salary.grandTotal });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the grand total' });
  }
}

module.exports = getGrandTotal;
