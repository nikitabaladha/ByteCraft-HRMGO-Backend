const CompanyPolicy = require("../../../models/CompanyPolicy");

async function createCompanyPolicy(req, res) {
  try {
    const { branch, title, description } = req.body;

    if (!branch || !title) {
      return res.status(400).json({
        message: "Branch and Title are required.",
        hasError: true,
      });
    }

    const newCompanyPolicy = new CompanyPolicy({
      branch,
      title,
      description,
    });

    await newCompanyPolicy.save();

    return res.status(201).json({
      message: "Company policy created successfully.",
      companyPolicy: newCompanyPolicy,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating company policy:", error);
    return res.status(500).json({
      message: "Internal server error. Failed to create company policy.",
      error: error.message || error,
      hasError: true,
    });
  }
}

module.exports = createCompanyPolicy;
