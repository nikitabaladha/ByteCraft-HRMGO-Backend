const AllowanceOption = require("../../../models/AllowanceOption");

async function create(req, res) {
  try {
    const { allowanceName } = req.body;

    if (!allowanceName) {
      return res.status(400).json({ message: "Allowance Name is required." });
    }

    const newAllowanceOption = new AllowanceOption({
      allowanceName,
    });

    await newAllowanceOption.save();

    return res.status(201).json({
      message: "Allowance Option created successfully!",
      allowanceOption: newAllowanceOption,
    });
  } catch (error) {
    console.error("Error creating allowance option:", error);
    return res.status(500).json({
      message: "Failed to create allowance option.",
      error: error.message,
    });
  }
}

module.exports = create;
