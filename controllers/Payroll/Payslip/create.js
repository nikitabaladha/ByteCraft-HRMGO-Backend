const Payroll = require('../../../models/Payroll');
const Employee = require('../../../models/Employee');
const Payrollvalidators = require('../../../validators/Payrollvalidators/Payrollvalidators.js');


async function create(req, res) {
  const { error } = Payrollvalidators.validate(req.body);  

 
  if (error) {
    return res.status(400).json({
      error: error.details.map(detail => detail.message).join(', ')
    });
  }

  const { employeeId, payrollType, salary, netSalary, status, paydate } = req.body;

  try {
    
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }


    const payMonth = new Date(paydate).getMonth() + 1;  
    const payYear = new Date(paydate).getFullYear();    


    const newPayroll = new Payroll({
      employeeId,
      payrollType,
      salary,
      netSalary,
      status,        
      paydate,       
      month: payMonth, 
      year: payYear  
    });

  
    await newPayroll.save();

  
    res.status(201).json({
      message: 'Payroll record created successfully',
      data: newPayroll
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the payroll record' });
  }
};

module.exports = create; 
