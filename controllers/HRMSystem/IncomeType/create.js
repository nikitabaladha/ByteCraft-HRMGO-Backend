const IncomeType = require("../../../models/IncomeType");

async function create(req, res) {
  try {
    const { incomeName } = req.body;

    if (!incomeName) {
      return res.status(400).json({ message: "Income Type Name is required." });
    }

    const newIncomeType = new IncomeType({
      incomeName,
    });

    await newIncomeType.save();

    return res.status(201).json({
      message: "Income Type created successfully!",
      incomeType: newIncomeType,
    });
  } catch (error) {
    console.error("Error creating income type:", error);
    return res.status(500).json({
      message: "Failed to create income type.",
      error: error.message,
    });
  }
}

module.exports = create;
