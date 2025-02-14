const CompanyPolicy = require("../../../models/CompanyPolicy");

async function getAllCompanyPolicies(req, res) {
  try {
    const companyPolicies = await CompanyPolicy.find(); // Get all policies

    if (companyPolicies.length === 0) {
      return res.status(404).json({
        message: "No company policies found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      message: "Company policies retrieved successfully.",
      companyPolicies,
      hasError: false,
    });
  } catch (error) {
    console.error("Error fetching company policies:", error);
    return res.status(500).json({
      message: "Internal server error. Failed to fetch company policies.",
      error: error.message || error,
      hasError: true,
    });
  }
}

module.exports = getAllCompanyPolicies;
