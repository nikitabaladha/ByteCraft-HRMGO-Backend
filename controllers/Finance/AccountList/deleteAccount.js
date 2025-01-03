const Account = require('../../../models/Finance'); 


async function deleteAccount(req, res) {
  const { id } = req.params; 

  try {
  
    const deletedAccount = await Account.findByIdAndDelete(id);


    if (!deletedAccount) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    res.status(200).json({
      message: 'Account deleted successfully',
      data: deletedAccount,
    });
  } catch (error) {
    console.error(error);

  
    res.status(500).json({
      message: 'An error occurred while deleting the account',
      error: error.message,
    });
  }
}

module.exports = deleteAccount; 
