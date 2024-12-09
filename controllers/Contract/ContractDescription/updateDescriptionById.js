const Contract = require("../../../models/Contract");

async function updateDescriptionById(req, res) {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // Ensure description is provided
    if (!description) {
      return res.status(400).json({
        hasError: true,
        message: "Description is required.",
      });
    }

    // Find the contract by its ID
    const existingContract = await Contract.findById(id);
    if (!existingContract) {
      return res
        .status(404)
        .json({ hasError: true, message: "Contract not found." });
    }

    existingContract.description = description;

    // Save the updated contract
    const updatedContract = await existingContract.save();

    return res.status(200).json({
      message: "Contract updated successfully!",
      data: updatedContract,
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating contract:", error);
    return res
      .status(500)
      .json({ message: "Failed to update contract.", error: error.message });
  }
}

module.exports = updateDescriptionById;
