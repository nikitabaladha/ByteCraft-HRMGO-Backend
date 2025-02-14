const Role = require('../../../models/StaffRole');

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    if (!roles.length) {
      return res.status(404).json({ message: 'No roles found.' });
    }

    res.status(200).json({
      message: 'Roles retrieved successfully.',
      data: roles,
    });
  } catch (error) {
    console.error('Error retrieving roles:', error);
    res.status(500).json({ message: 'An error occurred while retrieving roles.', error });
  }
};

module.exports = getAllRoles;
