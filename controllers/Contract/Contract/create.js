const Contract = require("../../../models/Contract");
const ContractValidator = require("../../../validators/ContractValidators/ContractValidator");

async function create(req, res) {
  try {
    // Validate the request body using a Joi validator
    const { error } = ContractValidator.ContractCreateValidator.validate(
      req.body
    );
    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        hasError: true,
        message: errorMessages,
      });
    }

    // Extract data from the request body
    const {
      employeeId,
      subject,
      value,
      contractTypeId,
      startDate,
      endDate,
      status,
      description,
    } = req.body;

    // Generate the next contract ID
    const lastContract = await Contract.findOne().sort({ id: -1 }).limit(1);
    const lastContractId = lastContract ? lastContract.id : "CON0000000";
    const nextContractIdNumber =
      parseInt(lastContractId.replace("CON", "")) + 1;
    const nextContractId = `CON${nextContractIdNumber
      .toString()
      .padStart(7, "0")}`;

    // Create a new Contract instance
    const newContract = new Contract({
      id: nextContractId,
      employeeId,
      subject,
      value,
      contractTypeId,
      startDate,
      endDate,
      status,
      description,
    });

    // Save the contract to the database
    await newContract.save();

    return res.status(201).json({
      hasError: false,
      message: "Contract created successfully!",
      contract: newContract,
    });
  } catch (error) {
    console.error("Error during creating Contract:", error);
    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
