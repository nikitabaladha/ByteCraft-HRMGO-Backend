const ContractType = require("../../../models/ContractType");

async function create(req, res) {
  try {
    const { contractName } = req.body; 

    if (!contractName) {
      return res.status(400).json({ message: "Contract Type Name is required." }); 
    }

    const newContractType = new ContractType({
      contractName, 
    });

    await newContractType.save();

    return res.status(201).json({
      message: "Contract Type created successfully!",  
      contractType: newContractType,  
    });
  } catch (error) {
    console.error("Error creating contract type:", error);  
    return res.status(500).json({
      message: "Failed to create contract type.",  
      error: error.message,
    });
  }
}

module.exports = create;
