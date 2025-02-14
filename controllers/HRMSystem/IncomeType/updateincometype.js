const IncomeType = require("../../../models/IncomeType");

async function update(req, res) {
  try {
    const { incomeName } = req.body; 
    const { id } = req.params;

    const incomeType = await IncomeType.findById(id);

    if (!incomeType) {
      return res.status(404).json({ message: "Income Type not found." });
    }

 
    incomeType.incomeName = incomeName || incomeType.incomeName;

    await incomeType.save();

    return res.status(200).json({
      message: "Income Type updated successfully!",
      incomeType,
    });
  } catch (error) {
    console.error("Error updating income type:", error);
    return res.status(500).json({
      message: "Failed to update income type.",
      error: error.message,
    });
  }
}

module.exports = update;
