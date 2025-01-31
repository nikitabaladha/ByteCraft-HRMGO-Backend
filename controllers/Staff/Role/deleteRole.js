const Role = require('../../../models/StaffRole');

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Role ID is required.' });
    }

    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    res.status(200).json({
      message: 'Role deleted successfully.',
      role: deletedRole,
    });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: 'An error occurred while deleting the role.', error });
  }
};

module.exports = deleteRole;
