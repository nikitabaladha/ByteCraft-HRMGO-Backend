const ContractValidator = require("../../../validators/ContractValidators/ContractValidator");
const Contract = require("../../../models/Contract");

async function updateById(req, res) {
  try {
    const { id } = req.params;

    const { error } = ContractValidator.ContractUpdateValidator.validate(
      req.body
    );

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const contract = await Contract.findById(id);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    const {
      employeeId,
      subject,
      value,
      contractTypeId,
      startDate,
      endDate,
      status,
    } = req.body;

    if (employeeId !== undefined) contract.employeeId = employeeId;
    if (subject !== undefined) contract.subject = subject;
    if (value !== undefined) contract.value = value;
    if (contractTypeId !== undefined) contract.contractTypeId = contractTypeId;
    if (startDate !== undefined) contract.startDate = startDate;
    if (endDate !== undefined) contract.endDate = endDate;
    if (status !== undefined) contract.status = status;

    await contract.save();

    return res.status(200).json({
      hasError: false,
      message: "Contract updated successfully",
      data: contract,
    });
  } catch (error) {
    console.error("Error updating contract:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = updateById;
