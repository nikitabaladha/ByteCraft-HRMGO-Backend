// Use require instead of import
const createLeaveType = require("./LeaveType/create");
const getAllLeaveType = require("./LeaveType/getAll");
const updateLeaveType = require("./LeaveType/updateLeaveType");
const deleteLeaveType = require("./LeaveType/deleteLeaveType");

const createPayslipType = require("./PayslipType/create");
const getAllPayslipTypes = require("./PayslipType/getAll");
const updatePayslipType = require("./PayslipType/updatepaysliptype");
const deletePayslipType = require("./PayslipType/deletepaysliptype");

const createDocumentType = require("./DocumentType/create");
const getAllDocumentTypes = require("./DocumentType/getAll");
const updateDocumentType = require("./DocumentType/updatedocumentptype");
const deleteDocumentType = require("./DocumentType/deletedocumenttype");

const createAllowanceOption = require("./AllowanceOption/create");
const getAllAllowanceOption = require("./AllowanceOption/getAll");
const updateAllowanceOption = require("./AllowanceOption/updateallowanceoption");
const deleteAllowanceOption = require("./AllowanceOption/deleteallowanceoption");

const createLoanOption = require("./LoanOption/create");
const getAllLoanOption = require("./LoanOption/getAll");
const updateLoanOption = require("./LoanOption/updateloanoption");
const deleteLoanOption = require("./LoanOption/deleteloanoption");

const createDeductionOption = require("./DeductionOption/create");
const getAllDeductionOption = require("./DeductionOption/getAll");
const updateDeductionOption = require("./DeductionOption/updatedeductionoption");
const deleteDeductionOption = require("./DeductionOption/deletedeductionoption");

const createTrainingType = require("./TrainingType/create");
const getAllTrainingType = require("./TrainingType/getAll");
const updateTrainingType = require("./TrainingType/updatetrainingtype");
const deleteTrainingType = require("./TrainingType/deletetrainingtype");

const createAwardType = require("./AwardType/create");
const getAllAwardType = require("./AwardType/getAll");
const updateAwardType = require("./AwardType/updateawardtype");
const deleteAwardType = require("./AwardType/deleteawardtype");

const createJobStage = require("./JobStage/create");
const getAllJobStage = require("./JobStage/getAll");
const updateJobStage = require("./JobStage/updatejobstage");
const deleteJobStage = require("./JobStage/deletejobstage");

const createTerminationType = require("./TerminationType/create");
const getAllTerminationTypes = require("./TerminationType/getAll");
const updateTerminationType = require("./TerminationType/updateterminationtype");
const deleteTerminationType = require("./TerminationType/deleteterminationtype");

const createPerformanceType = require("./PerformanceType/create");
const getAllPerformanceTypes = require("./PerformanceType/getAll");
const updatePerformanceType = require("./PerformanceType/updateperformancetype");
const deletePerformanceType = require("./PerformanceType/deleteperformancetype");

const createExpenseType = require("./ExpenseType/create");
const getAllExpenseTypes = require("./ExpenseType/getAll");
const updateExpenseType = require("./ExpenseType/updateexpensetype");
const deleteExpenseType = require("./ExpenseType/deleteexpensetype");

const createIncomeType = require("./IncomeType/create");
const getAllIncomeTypes = require("./IncomeType/getAll");
const updateIncomeType = require("./IncomeType/updateincometype");
const deleteIncomeType = require("./IncomeType/deleteincometype");

const createPaymentType = require("./PaymentType/create");
const getAllPaymentTypes = require("./PaymentType/getAll");
const updatePaymentType = require("./PaymentType/updatepaymenttype");
const deletePaymentType = require("./PaymentType/deletepaymenttype");

const createContractType = require("./ContractType/create");
const getAllContractTypes = require("./ContractType/getAll");
const updateContractType = require("./ContractType/updatecontracttype");
const deleteContractType = require("./ContractType/deletecontracttype");

const createJobCategory = require("./JobCategory/create");
const getAllJobCategories = require("./JobCategory/getAll");
const updateJobCategory = require("./JobCategory/updatejobcategory");
const deleteJobCategory = require("./JobCategory/deletejobcategory");

module.exports = {
  createLeaveType,
  getAllLeaveType,
  updateLeaveType,
  deleteLeaveType,

  createPayslipType,
  getAllPayslipTypes,
  updatePayslipType,
  deletePayslipType,

  createDocumentType,
  getAllDocumentTypes,
  updateDocumentType,
  deleteDocumentType,

  createAllowanceOption,
  getAllAllowanceOption,
  updateAllowanceOption,
  deleteAllowanceOption,

  createLoanOption,
  getAllLoanOption,
  updateLoanOption,
  deleteLoanOption,

  createDeductionOption,
  getAllDeductionOption,
  updateDeductionOption,
  deleteDeductionOption,

  createTrainingType,
  getAllTrainingType,
  updateTrainingType,
  deleteTrainingType,

  createAwardType,
  getAllAwardType,
  updateAwardType,
  deleteAwardType,

  createJobStage,
  getAllJobStage,
  updateJobStage,
  deleteJobStage,

  createTerminationType,
  getAllTerminationTypes,
  updateTerminationType,
  deleteTerminationType,

  createPerformanceType,
  getAllPerformanceTypes,
  updatePerformanceType,
  deletePerformanceType,

  createExpenseType,
  getAllExpenseTypes,
  updateExpenseType,
  deleteExpenseType,

  createIncomeType,
  getAllIncomeTypes,
  updateIncomeType,
  deleteIncomeType,

  createPaymentType,
  getAllPaymentTypes,
  updatePaymentType,
  deletePaymentType,

  createContractType,
  getAllContractTypes,
  updateContractType,
  deleteContractType,

  createJobCategory,
  getAllJobCategories,
  updateJobCategory,
  deleteJobCategory,
};
