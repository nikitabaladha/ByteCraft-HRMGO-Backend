const ContractValidator = require("../../validators/ContractValidators/ContractValidator");
const Contract = require("../../models/Contract");

async function create(req, res) {
  try {
    const { error } = ContractValidator.ContractCreateValidator.validate(
      req.body
    );
    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const {
      employeeId,
      subject,
      value,
      contractTypeId,
      startDate,
      endDate,
      status,
      description,
      attachmentUrl,
      comments,
      notes,
    } = req.body;

    // Check if the contract already exists
    const existingContract = await Contract.findOne({
      employeeId,
      contractTypeId,
      startDate,
    });

    if (existingContract) {
      return res.status(409).json({
        hasError: true,
        message:
          "Contract already exists for this employee with the same start date.",
      });
    }

    // Generate the next contract ID
    const lastContract = await Contract.findOne().sort({ id: -1 }).limit(1);
    const lastContractId = lastContract ? lastContract.id : "CON0000";
    const nextContractIdNumber =
      parseInt(lastContractId.replace("CON", ""), 10) + 1;
    const nextContractId = `CON${nextContractIdNumber
      .toString()
      .padStart(5, "0")}`;

    const newContract = new Contract({
      id: nextContractId,
      employeeId,
      subject,
      value,
      contractTypeId,
      startDate,
      endDate,
      status,
      description: description || "", // Default to empty string if not provided
      attachmentUrl: attachmentUrl || [], // Default to empty array if not provided
      comments: comments || [], // Default to empty array if not provided
      notes: notes || [], // Default to empty array if not provided
    });

    await newContract.save();

    return res.status(201).json({
      message: "Contract created successfully!",
      data: newContract,
    });
  } catch (error) {
    console.error("Error creating contract:", error);

    // Handle duplicate key errors if any
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Contract creation failed: duplicate entry.",
      });
    }

    return res.status(500).json({
      message: "Failed to create contract.",
      error: error.message,
    });
  }
}

module.exports = create;
