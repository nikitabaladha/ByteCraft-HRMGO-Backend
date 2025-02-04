const Expense = require('../../../models/Expense'); 
const expenseValidator = require('../../../validators/Finance/ExpenseValidators'); 
const moment = require('moment');

async function createExpense(req, res) {
  const { error } = expenseValidator.validate(req.body); 

  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { account_name, amount, date, category, payee_name, payment_type, ref, description } = req.body; 

  try {

    const formattedDate = moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');

    
    const existingExpense = await Expense.findOne({ ref }); 
    if (existingExpense) {
      return res.status(400).json({
        message: 'Expense creation failed',
        errors: 'Expense with this referral ID already exists',
      });
    }

  
    const newExpense = new Expense({
      account_name,
      amount,
      date: formattedDate, 
      category,
      payee_name, 
      payment_type,
      ref,
      description,
    });

   
    await newExpense.save();


    res.status(201).json({
      message: 'Expense created successfully',
      data: newExpense,
    });
  } catch (err) {
    console.error(err);

    
    res.status(500).json({
      message: 'An error occurred while creating the expense', 
      error: err.message,
    });
  }
}

module.exports = createExpense; 
