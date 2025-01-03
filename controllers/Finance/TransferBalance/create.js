const TransferBalance = require('../../../models/TransferBalance'); 
const transferBalanceValidator = require('../../../validators/Finance/TransferBalanceValidators'); 
const moment = require('moment'); 

async function createTransferBalance(req, res) {
  const { error } = transferBalanceValidator.validate(req.body); 
 
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { fromAccountId, toAccountId, amount, date, paymentTypeId, referalId, description } = req.body;

  try {
    
    const formattedDate = moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');


    const existingTransferBalance = await TransferBalance.findOne({ referalId });
    if (existingTransferBalance) {
      return res.status(400).json({
        message: 'Transfer balance creation failed',
        errors: 'Transfer balance with this referral ID already exists',
      });
    }

    // Create a new TransferBalance document
    const newTransferBalance = new TransferBalance({
      fromAccountId,
      toAccountId,
      amount,
      date: formattedDate, // Store the formatted date
      paymentTypeId,
      referalId,
      description,
    });


    await newTransferBalance.save();


    res.status(201).json({
      message: 'Transfer balance created successfully',
      data: newTransferBalance,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'An error occurred while creating the transfer balance',
      error: err.message,
    });
  }
}

module.exports = createTransferBalance; // Export createTransferBalance
