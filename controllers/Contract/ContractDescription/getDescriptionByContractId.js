const Contract = require("../../../models/Contract");

async function getDescriptionByContractId(req, res) {
  try {
    // Extract contractId from the request query
    const { contractId } = req.query;

    // Validate that contractId is provided
    if (!contractId) {
      return res.status(400).json({
        hasError: true,
        message: "Contract ID is required.",
      });
    }

    // Fetch the contract for the specified contractId
    const contract = await Contract.findById(contractId);

    // Check if the contract exists
    if (!contract) {
      return res.status(404).json({
        hasError: true,
        message: "No contract found for the specified contract ID.",
      });
    }

    // Format the response data
    const responseData = {
      id: contract._id,
      description: contract.description,
      createdAt: contract.createdAt,
      updatedAt: contract.updatedAt,
    };

    // Send the response
    return res.status(200).json({
      hasError: false,
      message: "Contract fetched successfully!",
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching contract:", error.message);

    // Handle server error
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch contract.",
      error: error.message,
    });
  }
}

module.exports = getDescriptionByContractId;
