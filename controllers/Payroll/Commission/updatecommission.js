// const Commission = require('../../../models/Commission');
// const Employee = require('../../../models/Employee');
// const updateCommissionValidator = require('../../../validators/EmployeeSetSalary/CommissionValidator');

// async function updateCommission(req, res) {
//   const { error, value } = updateCommissionValidator.validate(req.body);

//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   const { employeeId, employeeName, title, type, amount } = value;
//   const { commissionId } = req.params; 

//   try {
//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found.' });
//     }

//     let commission = await Commission.findById(commissionId);
//     if (!commission) {
//       return res.status(404).json({ error: 'Commission record not found.' });
//     }

//     commission.employeeName = employeeName;
//     commission.title = title;
//     commission.type = type;
//     commission.amount = amount;

//     await commission.save();

//     return res.status(200).json({
//       message: 'Commission record updated successfully.',
//       data: commission,
//     });
//   } catch (error) {
//     console.error('Error updating commission record:', error);
//     return res.status(500).json({ error: 'An error occurred while updating the commission record.' });
//   }
// }

// module.exports = updateCommission;

const Commission = require('../../../models/Commission');
const Employee = require('../../../models/Employee');
const Salary = require('../../../models/EmployeeSetSalary');
const updateCommissionValidator = require('../../../validators/EmployeeSetSalary/CommissionValidator');

async function updateCommission(req, res) {
  const { error, value } = updateCommissionValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { employeeId, employeeName, title, type, amount } = value;
  const { commissionId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    let commission = await Commission.findById(commissionId);
    if (!commission) {
      return res.status(404).json({ error: 'Commission record not found.' });
    }


    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid commission amount.' });
    }

    const amountDifference = amount - commission.amount;

  
    commission.employeeName = employeeName;
    commission.title = title;
    commission.type = type;
    commission.amount = amount;

    await commission.save();

  
    const salary = await Salary.findOne({ employeeId });
    if (!salary) {
      return res.status(404).json({ error: 'Salary record not found for the employee.' });
    }


    if (isNaN(salary.grandTotal)) {
      salary.grandTotal = 0; 
    }

  
    const updatedGrandTotal = salary.grandTotal + amountDifference;

    if (isNaN(updatedGrandTotal)) {
      return res.status(400).json({ error: 'Invalid grandTotal calculation.' });
    }

    salary.grandTotal = updatedGrandTotal < 0 ? 0 : updatedGrandTotal;  

    await salary.save();

    return res.status(200).json({
      message: 'Commission record updated successfully, and grandTotal updated in Salary model.',
      data: {
        commission,
        salary,
      },
    });
  } catch (error) {
    console.error('Error updating commission record:', error);
    return res.status(500).json({ error: 'An error occurred while updating the commission record.' });
  }
}

module.exports = updateCommission;


