const ContractType = require("../../../models/ContractType");

async function deleteContractType(req, res) {
  const { id } = req.params;

  try {
    const deletedContractType = await ContractType.findByIdAndDelete(id);

    if (!deletedContractType) {
      return res.status(404).json({
        message: 'Contract Type not found',
      });
    }

    res.status(200).json({
      message: 'Contract Type deleted successfully',
      data: deletedContractType,
    });
  } catch (error) {
    console.error("Error deleting contract type:", error);

    res.status(500).json({
      message: 'An error occurred while deleting the contract type',
      error: error.message,
    });
  }
}

module.exports = deleteContractType;
