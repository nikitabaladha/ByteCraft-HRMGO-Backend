const Expense = require('../../../models/Expense'); 


async function deleteExpense(req, res) {
  const { id } = req.params; 

  try {
  
    const deletedExpense = await Expense.findByIdAndDelete(id); 

 
    if (!deletedExpense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }


    res.status(200).json({
      message: 'Expense deleted successfully', 
      data: deletedExpense, 
    });
  } catch (error) {
    console.error(error);


    res.status(500).json({
      message: 'An error occurred while deleting the expense', 
      error: error.message,
    });
  }
}

module.exports = deleteExpense; 
