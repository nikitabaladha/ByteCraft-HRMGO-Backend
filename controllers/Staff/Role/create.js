const Role = require('../../../models/StaffRole');
 
const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
 
    if (!name || !permissions) {
      return res.status(400).json({ message: 'Name and permissions are required.' });
    }
 
    
    const filteredPermissions = permissions.filter(permission =>
      permission.module &&
      Array.isArray(permission.actions) &&
      permission.actions.length > 0 &&
      permission.actions.every(action => ['Manage', 'Create', 'Edit', 'Delete', 'Show', 'Move', 'Add'].includes(action))
    );
 
    if (filteredPermissions.length === 0) {
      return res.status(400).json({ message: 'At least one valid permission with actions is required.' });
    }
 
    const role = new Role({
      name,
      permissions: filteredPermissions,
    });
 
    const savedRole = await role.save();
 
    res.status(201).json({
      message: 'Role created successfully.',
      role: savedRole,
    });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'An error occurred while creating the role.', error });
  }
};
 
module.exports = createRole;
