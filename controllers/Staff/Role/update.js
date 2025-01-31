const Role = require("../../../models/StaffRole");
 
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
 
    if (!name && !permissions) {
      return res.status(400).json({
        message: "Name or permissions are required to update the role.",
      });
    }
 
    let updatedFields = {};
 
    if (name) {
      updatedFields.name = name;
    }
 
    if (permissions) {
      const filteredPermissions = permissions.filter(
        (permission) =>
          permission.module &&
          Array.isArray(permission.actions) &&
          permission.actions.length > 0 &&
          permission.actions.every((action) =>
            [
              "Manage",
              "Create",
              "Edit",
              "Delete",
              "Show",
              "Move",
              "Add",
            ].includes(action)
          )
      );
 
      if (filteredPermissions.length === 0) {
        return res.status(400).json({
          message: "At least one valid permission with actions is required.",
        });
      }
 
      updatedFields.permissions = filteredPermissions;
    }
 
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );
 
    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found." });
    }
 
    res.status(200).json({
      message: "Role updated successfully.",
      role: updatedRole,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the role.", error });
  }
};
 
module.exports = updateRole;