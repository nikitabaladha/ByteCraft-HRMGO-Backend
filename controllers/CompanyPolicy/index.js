const createCompanyPolicy = require("./CompanyPolicy/create");
const getAllCompanyPolicies=require("./CompanyPolicy/gatall");
const deleteCompanyPolicy=require("./CompanyPolicy/delete");
const updateCompanyPolicy=require("./CompanyPolicy/update")


module.exports = {
  createCompanyPolicy,
  getAllCompanyPolicies,
  deleteCompanyPolicy,
  updateCompanyPolicy
  
};



