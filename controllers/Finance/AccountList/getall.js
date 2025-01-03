const Account = require('../../../models/Finance'); 


async function getAllAccounts(req, res) {
  try {
 
    const accounts = await Account.find();


    res.status(200).json({
      message: 'Accounts fetched successfully',
      data: accounts,
    });
  } catch (error) {
    console.error(error);


    res.status(500).json({
      message: 'An error occurred while fetching accounts',
      error: error.message,
    });
  }
}

module.exports = getAllAccounts; 
