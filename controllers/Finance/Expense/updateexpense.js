const Expense = require('../../../models/Expense');
const expenseValidator = require('../../../validators/Finance/ExpenseValidators'); 

async function updateexpense(req, res) {
  const { id } = req.params; 
  const { error } = expenseValidator.validate(req.body); 


  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { account_name, amount, date, category, payee_name, payment_type, ref, description } = req.body;

  try {
   
    const existingExpense = await Expense.findById(id);
    if (!existingExpense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    
    if (ref && ref !== existingExpense.ref) {
      const refExists = await Expense.findOne({ ref });
      if (refExists) {
        return res.status(400).json({
          message: 'Update failed',
          errors: 'Another expense with this referral ID already exists',
        });
      }
    }


    existingExpense.account_name = account_name || existingExpense.account_name;
    existingExpense.amount = amount || existingExpense.amount;
    existingExpense.date = date || existingExpense.date;
    existingExpense.category = category || existingExpense.category;
    existingExpense.payee_name = payee_name || existingExpense.payee_name;
    existingExpense.payment_type = payment_type || existingExpense.payment_type;
    existingExpense.ref = ref || existingExpense.ref;
    existingExpense.description = description || existingExpense.description;

     
    const updatedExpense = await existingExpense.save();

    
    res.status(200).json({
      message: 'Expense updated successfully',
      data: updatedExpense,
    });
  } catch (err) {
    console.error(err);

   
    res.status(500).json({
      message: 'An error occurred while updating the expense',
      error: err.message,
    });
  }
}

module.exports = updateexpense; 
