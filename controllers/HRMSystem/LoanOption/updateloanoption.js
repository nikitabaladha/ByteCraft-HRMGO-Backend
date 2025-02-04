const LoanOption = require("../../../models/LoanOption");

async function update(req, res) {
  try {
    const { loanName } = req.body;  
    const { id } = req.params;

    const loanOption = await LoanOption.findById(id);

    if (!loanOption) {
      return res.status(404).json({ message: "Loan Option not found." });
    }

    loanOption.loanName = loanName || loanOption.loanName;  

    await loanOption.save();

    return res.status(200).json({
      message: "Loan Option updated successfully!",
      loanOption,
    });
  } catch (error) {
    console.error("Error updating loan option:", error);
    return res.status(500).json({
      message: "Failed to update loan option.",
      error: error.message,
    });
  }
}

module.exports = update;
