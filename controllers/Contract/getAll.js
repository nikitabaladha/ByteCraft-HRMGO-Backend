const Contract = require("../../models/Contract");
const Employee = require("../../models/Employee");
const ContractType = require("../../models/ContractType");

async function getAll(req, res) {
  try {
    const contracts = await Contract.find()
      .populate({
        path: "employeeId",
        select: "name",
      })
      .populate({
        path: "contractTypeId",
        select: "contractName",
      });

    const response = contracts.map((contract) => ({
      contractId: contract.id,
      employeeName: contract.employeeId ? contract.employeeId.name : "N/A",
      subject: contract.subject,
      value: contract.value,
      contractType: contract.contractTypeId
        ? contract.contractTypeId.contractName
        : "N/A",
      startDate: contract.startDate,
      endDate: contract.endDate,
      status: contract.status,
      id: contract._id,
    }));

    return res.status(200).json({
      message: "Contracts fetched successfully!",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching contracts:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
