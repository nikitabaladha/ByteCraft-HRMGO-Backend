const LoanOption = require("../../../models/LoanOption");

async function create(req, res) {
  try {
    const { loanName } = req.body;

    if (!loanName) {
      return res.status(400).json({ message: "Loan Name is required." });
    }

    const newLoanOption = new LoanOption({
      loanName,
    });

    await newLoanOption.save();

    return res.status(201).json({
      message: "Loan Option created successfully!",
      loanOption: newLoanOption,
    });
  } catch (error) {
    console.error("Error creating loan option:", error);
    return res.status(500).json({
      message: "Failed to create loan option.",
      error: error.message,
    });
  }
}

module.exports = create;
