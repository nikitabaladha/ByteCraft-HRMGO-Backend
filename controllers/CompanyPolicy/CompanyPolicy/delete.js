const CompanyPolicy = require('../../../models/CompanyPolicy');

async function deleteCompanyPolicy(req, res) {
  const { id } = req.params;

  try {
    const deletedCompanyPolicy = await CompanyPolicy.findByIdAndDelete(id);

    if (!deletedCompanyPolicy) {
      return res.status(404).json({
        message: 'Company policy not found',
      });
    }

    res.status(200).json({
      message: 'Company policy deleted successfully',
      data: deletedCompanyPolicy,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the company policy',
      error: error.message,
    });
  }
}

module.exports = deleteCompanyPolicy;
