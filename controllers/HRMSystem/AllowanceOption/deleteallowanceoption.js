const AllowanceOption = require("../../../models/AllowanceOption");

async function deleteAllowanceOption(req, res) {
  const { id } = req.params;

  try {
    const deletedAllowanceOption = await AllowanceOption.findByIdAndDelete(id);

    if (!deletedAllowanceOption) {
      return res.status(404).json({
        message: 'Allowance Option not found',
      });
    }

    res.status(200).json({
      message: 'Allowance Option deleted successfully',
      data: deletedAllowanceOption,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the allowance option',
      error: error.message,
    });
  }
}

module.exports = deleteAllowanceOption;
