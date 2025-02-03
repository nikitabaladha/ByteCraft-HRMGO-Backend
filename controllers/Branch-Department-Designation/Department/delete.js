const Department = require("../../../models/Department");

async function deleteDepartment(req, res) {
  const { id } = req.params;

  try {
    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({
        message: 'Department not found',
      });
    }

    res.status(200).json({
      message: 'Department deleted successfully',
      data: deletedDepartment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the department',
      error: error.message,
    });
  }
}

module.exports = deleteDepartment;
