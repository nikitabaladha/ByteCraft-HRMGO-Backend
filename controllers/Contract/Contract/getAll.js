const Contract = require("../../../models/Contract");
const Employee = require("../../../models/Employee");
const ContractType = require("../../../models/ContractType");

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

    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const currentYear = now.getFullYear();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Adjust to Monday

    // Calculate the end of the current week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const response = contracts.map((contract) => ({
      contractId: contract.id,
      employeeName: contract.employeeId ? contract.employeeId.name : "N/A",
      subject: contract.subject,
      value: contract.value,
      contractType: contract.contractTypeId
        ? contract.contractTypeId.contractName
        : "N/A",

      contractTypeId: contract.contractTypeId
        ? contract.contractTypeId._id
        : "N/A",

      employeeId: contract.employeeId ? contract.employeeId._id : "N/A",
      startDate: contract.startDate,
      endDate: contract.endDate,
      status: contract.status,
      id: contract._id,
      description: contract.description,
    }));

    const totalValue = response.reduce(
      (acc, contract) => acc + contract.value,
      0
    );

    const totalValueOfThisMonth = contracts.reduce((acc, contract) => {
      const startDate = new Date(contract.startDate);
      if (
        startDate.getMonth() === currentMonth &&
        startDate.getFullYear() === currentYear
      ) {
        return acc + contract.value;
      }
      return acc;
    }, 0);

    const totalValueThisWeek = contracts.reduce((acc, contract) => {
      const startDate = new Date(contract.startDate);
      if (startDate >= startOfWeek && startDate <= endOfWeek) {
        return acc + contract.value;
      }
      return acc;
    }, 0);

    const last30DaysValue = contracts.reduce((acc, contract) => {
      const startDate = new Date(contract.startDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      if (startDate >= thirtyDaysAgo) {
        return acc + contract.value;
      }
      return acc;
    }, 0);

    return res.status(200).json({
      message: "Contracts fetched successfully!",
      data: response,
      totalValue: totalValue,
      totalValueOfThisMonth: totalValueOfThisMonth,
      totalValueOfThisWeek: totalValueThisWeek,
      last30DaysValue: last30DaysValue,
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
