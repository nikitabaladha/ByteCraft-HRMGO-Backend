// ByteCraft-HRMGO-Backend\controllers\ContractType\create.js

const ContractTypeValidator = require("../../validators/ContractTypeValidator/ContractType");
const ContractType = require("../../models/ContractType");

// Create ContractType logic
async function create(req, res) {
  try {
    // Validate the Announcement data using Joi schema
    const { error } = ContractTypeValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { contractName } = req.body;

    const existingContract = await ContractType.findOne({
      contractName,
    });

    if (existingContract) {
      return res.status(400).json({
        hasError: true,
        message: "Contract already exists with this name",
      });
    }

    // Create and save the new ContractType
    const newContractType = new ContractType({
      contractName,
    });

    await newContractType.save();

    return res.status(201).json({
      message: "ContractType created successfully!",
      data: newContractType,
    });
  } catch (error) {
    console.error("Error creating ContractType:", error);
    return res.status(500).json({
      message: "Failed to create ContractType.",
      error: error.message,
    });
  }
}

module.exports = create;
