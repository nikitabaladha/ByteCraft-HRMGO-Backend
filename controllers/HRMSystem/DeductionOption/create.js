
const DeductionOption = require("../../../models/DeductionOption");

async function create(req, res) {
  try {
    const { deductionName } = req.body;

    if (!deductionName) {
      return res.status(400).json({ message: "Deduction Name is required." });
    }

    const newDeductionOption = new DeductionOption({
      deductionName,
    });

    await newDeductionOption.save();

    return res.status(201).json({
      message: "Deduction Option created successfully!",
      deductionOption: newDeductionOption,
    });
  } catch (error) {
    console.error("Error creating deduction option:", error);
    return res.status(500).json({
      message: "Failed to create deduction option.",
      error: error.message,
    });
  }
}

module.exports = create;
