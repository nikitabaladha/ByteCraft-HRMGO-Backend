const Contract = require("../../../models/Contract");

async function getDescriptionByContractId(req, res) {
  try {
    const { contractId } = req.query;

    if (!contractId) {
      return res.status(400).json({
        hasError: true,
        message: "Contract ID is required.",
      });
    }

    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({
        hasError: true,
        message: "No contract found for the specified contract ID.",
      });
    }

    const responseData = {
      id: contract._id,
      description: contract.description,
      createdAt: contract.createdAt,
      updatedAt: contract.updatedAt,
    };

    return res.status(200).json({
      hasError: false,
      message: "Contract fetched successfully!",
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching contract:", error.message);

    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch contract.",
      error: error.message,
    });
  }
}

module.exports = getDescriptionByContractId;
