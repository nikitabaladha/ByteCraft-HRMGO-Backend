const ContractType = require("../../models/ContractType");

async function getAll(req, res) {
  try {
    const contractTypes = await ContractType.find();

    if (contractTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No ContractType found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "ContractTypes fetched successfully",
      data: contractTypes,
    });
  } catch (error) {
    console.error("Error fetching contractTypes:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
