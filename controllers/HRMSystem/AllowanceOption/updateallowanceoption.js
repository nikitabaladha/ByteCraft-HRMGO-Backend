const AllowanceOption = require("../../../models/AllowanceOption");

async function update(req, res) {
  try {
    const { allowanceName } = req.body;
    const { id } = req.params;

    const allowanceOption = await AllowanceOption.findById(id);

    if (!allowanceOption) {
      return res.status(404).json({ message: "Allowance Option not found." });
    }

    allowanceOption.allowanceName = allowanceName || allowanceOption.allowanceName;

    await allowanceOption.save();

    return res.status(200).json({
      message: "Allowance Option updated successfully!",
      allowanceOption,
    });
  } catch (error) {
    console.error("Error updating allowance option:", error);
    return res.status(500).json({
      message: "Failed to update allowance option.",
      error: error.message,
    });
  }
}

module.exports = update;
