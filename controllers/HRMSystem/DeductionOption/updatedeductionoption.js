
const DeductionOption = require("../../../models/DeductionOption");

async function update(req, res) {
  try {
    const { deductionName } = req.body;
    const { id } = req.params;

    const deductionOption = await DeductionOption.findById(id);

    if (!deductionOption) {
      return res.status(404).json({ message: "Deduction Option not found." });
    }

    deductionOption.deductionName = deductionName || deductionOption.deductionName;

    await deductionOption.save();

    return res.status(200).json({
      message: "Deduction Option updated successfully!",
      deductionOption,
    });
  } catch (error) {
    console.error("Error updating deduction option:", error);
    return res.status(500).json({
      message: "Failed to update deduction option.",
      error: error.message,
    });
  }
}

module.exports = update;
