const Expense = require('../../../models/Expense'); 


async function getallexpenses(req, res) {
  try {
 
    const expenses = await Expense.find(); 

    
    res.status(200).json({
      message: 'Expenses fetched successfully', 
      data: expenses, 
    });
  } catch (error) {
    console.error(error);

  
    res.status(500).json({
      message: 'An error occurred while fetching expenses', 
      error: error.message,
    });
  }
}

module.exports = getallexpenses; // Export getallexpenses instead of getalldeposits
