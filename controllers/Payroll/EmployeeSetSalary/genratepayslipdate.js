const Payroll = require("../../../models/EmployeeSetSalary");

const updatePayDateForAllEmployees = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ payDate: { $exists: false } });

    if (payrolls.length === 0) {
      return res.status(400).json({
        message: "No employees found whose pay date needs to be generated.",
      });
    }

    const updatedPayrolls = await Promise.all(
      payrolls.map(async (payroll) => {
        payroll.payDate = new Date();
        await payroll.save();
        return payroll;
      })
    );

    res.status(200).json({
      message: "Pay dates generated successfully for all employees.",
      data: updatedPayrolls,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = updatePayDateForAllEmployees;
