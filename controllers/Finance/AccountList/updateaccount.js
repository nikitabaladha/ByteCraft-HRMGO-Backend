const Account = require('../../../models/Finance');
const AccountValidator = require('../../../validators/Finance/FinanceValidators');


async function update(req, res) {

  const { error } = AccountValidator.validate(req.body);


  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message),
    });
  }


  let { account_name, initial_balance, account_number, branch_code, bank_branch } = req.body;
  

  if (typeof account_number === 'string') {
    account_number = account_number.trim();
  }
  
  if (typeof branch_code === 'string') {
    branch_code = branch_code.trim();
  }

  try {
   
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      { account_name, initial_balance, account_number, branch_code, bank_branch },
      { new: true } 
    );

 
    if (!updatedAccount) {
      return res.status(404).json({
        message: 'Account not found',
        errors: 'No account found with the given ID',
      });
    }

  
    res.status(200).json({
      message: 'Account updated successfully',
      data: updatedAccount,
    });
  } catch (error) {
    console.error('Error updating account:', error);


    res.status(500).json({
      message: 'An error occurred while updating the account',
      error: error.message,
    });
  }
}

module.exports = update;
