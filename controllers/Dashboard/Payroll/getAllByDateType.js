const mongoose = require("mongoose");
const Salary = require("../../../models/Payroll");
const Allowance = require("../../../models/Allowance");
const Commission = require("../../../models/Commission");
const Loan = require("../../../models/Loan");
const Overtime = require("../../../models/Overtime");
const Tax = require("../../../models/Tax");
const Otherpayment = require("../../../models/Otherpayment");
const moment = require("moment");

async function getAllSalariesByDateType(req, res) {
  try {
    const { branch, department, date, type } = req.query;
    const filter = {};

    if (branch) filter["employeeId.branchId"] = new mongoose.Types.ObjectId(branch);
    if (department) filter["employeeId.departmentId"] = new mongoose.Types.ObjectId(department);

    let dateFilter = {};

    if (date) {
      if (type === "yearly") {
        const startOfYear = moment(date, "YYYY").startOf("year").toISOString();
        const endOfYear = moment(date, "YYYY").endOf("year").toISOString();
        dateFilter.createdAt = { $gte: startOfYear, $lte: endOfYear };
      } else if (type === "monthly") {
        const startOfMonth = moment(date, "YYYY-MM").startOf("month").toISOString();
        const endOfMonth = moment(date, "YYYY-MM").endOf("month").toISOString();
        dateFilter.createdAt = { $gte: startOfMonth, $lte: endOfMonth };
      }
    }

    const salaries = await Salary.find(dateFilter)
      .populate({
        path: "employeeId",
        select: "name id branchId departmentId",
        match: {
          ...(branch && { branchId: new mongoose.Types.ObjectId(branch) }),
          ...(department && { departmentId: new mongoose.Types.ObjectId(department) }),
        },
        populate: [
          { path: "branchId", select: "branchName" },
          { path: "departmentId", select: "departmentName" },
        ],
      })
      .lean()
      .exec();

    const salaryData = await Promise.all(
      salaries
        .filter((salary) => salary.employeeId != null)
        .map(async (salary) => {
          const employeeId = salary.employeeId.id;
          const employeeName = salary.employeeId.name;
          const branchName = salary.employeeId.branchId ? salary.employeeId.branchId.branchName : "N/A";
          const departmentName = salary.employeeId.departmentId ? salary.employeeId.departmentId.departmentName : "N/A";

          const formattedPayDate = moment.utc(salary.createdAt).format("MMM DD, YYYY");
          const formattedGrandTotal = salary.grandTotal;
          const status = salary.status;
          const salaryType = salary.salaryType;
          const formattedSalary = salary.salary;

          const allowances = await Allowance.find({ employeeId: salary.employeeId._id }).select("amount").lean();
          const commissions = await Commission.find({ employeeId: salary.employeeId._id }).select("amount").lean();
          const loans = await Loan.find({ employeeId: salary.employeeId._id }).select("amount").lean();
          const overtimes = await Overtime.find({ employeeId: salary.employeeId._id }).select("amount").lean();
          const taxes = await Tax.find({ employeeId: salary.employeeId._id }).select("amount").lean();
           const otherPayments = await Otherpayment.find({ employeeId: salary.employeeId._id }).select("amount").lean();


          const totalAllowance = allowances.reduce((sum, { amount }) => sum + amount, 0);
          const totalCommission = commissions.reduce((sum, { amount }) => sum + amount, 0);
          const totalLoan = loans.reduce((sum, { amount }) => sum + amount, 0);
          const totalOvertime = overtimes.reduce((sum, { amount }) => sum + amount, 0);
          const totalTax = taxes.reduce((sum, { amount }) => sum + amount, 0);
          const totalOtherPayment = otherPayments.reduce((sum, { amount }) => sum + amount, 0);

          const netPay = formattedSalary + totalAllowance + totalCommission + totalOvertime - (totalLoan + totalTax);

          return {
            employeeId,
            employeeName,
            branchName,
            departmentName,
            Date: formattedPayDate,
            salaryType,
            salary: formattedSalary,
            allowance: totalAllowance,
            commission: totalCommission,
            loan: totalLoan,
            overtime: totalOvertime,
            tax: totalTax,
            otherPayments: totalOtherPayment,
            grandTotal: formattedGrandTotal,
            netPay,
            status,
          };
        })
    );

    return res.status(200).json({
      message: "Salary records retrieved successfully!",
      data: salaryData,
    });
  } catch (error) {
    console.error("Error retrieving salary records:", error);
    return res.status(500).json({
      message: "Failed to retrieve salary records.",
      error: error.message,
    });
  }
}

module.exports = getAllSalariesByDateType;
