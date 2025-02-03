const Salary = require('../../../models/EmployeeSetSalary');
const Employee = require('../../../models/Employee');

async function getSalaryByEmployeeId(req, res) {
  const { employeeId } = req.params;

  try {

    const employee = await Employee.findById(employeeId);


    const salary = await Salary.findOne({ employeeId });

    
    res.status(200).json({
      message: 'Salary record retrieved successfully',
      data: {
        employee: employee || { _id: employeeId, name: 'Unknown', status: 'Not Found' },
        salary: salary || { salaryAmount: 0, payrollType: 'N/A' },
      },
    });
  } catch (error) {
    console.error('Error fetching salary or employee data:', error);
    res.status(200).json({
      message: 'Salary record retrieved successfully',
      data: {
        employee: { _id: employeeId, name: 'Unknown', status: 'Error' },
        salary: { salaryAmount: 0, payrollType: 'N/A' },
      },
    });
  }
}

module.exports = getSalaryByEmployeeId;
