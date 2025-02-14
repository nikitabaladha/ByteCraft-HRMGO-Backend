const CompanyPolicy = require("../../../models/CompanyPolicy");

async function updateCompanyPolicy(req, res) {
  try {
    const { branch, title, description } = req.body;
    const { policyId } = req.params;

    if (!branch || !title) {
      return res.status(400).json({
        message: "Branch and Title are required.",
        hasError: true,
      });
    }

    const companyPolicy = await CompanyPolicy.findById(policyId);

    if (!companyPolicy) {
      return res.status(404).json({
        message: "Company policy not found.",
        hasError: true,
      });
    }

    companyPolicy.branch = branch;
    companyPolicy.title = title || companyPolicy.title;
    companyPolicy.description = description || companyPolicy.description;

    await companyPolicy.save();

    return res.status(200).json({
      message: "Company policy updated successfully!",
      companyPolicy: companyPolicy,
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating company policy:", error);
    return res.status(500).json({
      message: "Internal server error. Failed to update company policy.",
      error: error.message || error,
      hasError: true,
    });
  }
}

module.exports = updateCompanyPolicy;
