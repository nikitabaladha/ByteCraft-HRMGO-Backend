const ContractType = require("../../../models/ContractType");

async function update(req, res) {
  try {
    const { contractName } = req.body;
    const { id } = req.params;

    const contractType = await ContractType.findById(id);

    if (!contractType) {
      return res.status(404).json({ message: "Contract Type not found." });
    }

    contractType.contractName = contractName || contractType.contractName;

    await contractType.save();

    return res.status(200).json({
      message: "Contract Type updated successfully!",
      contractType,
    });
  } catch (error) {
    console.error("Error updating contract type:", error);
    return res.status(500).json({
      message: "Failed to update contract type.",
      error: error.message,
    });
  }
}

module.exports = update;
