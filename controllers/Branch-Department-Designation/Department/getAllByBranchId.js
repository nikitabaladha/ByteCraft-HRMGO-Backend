const Department = require("../../../models/Department");
const Branch = require("../../../models/Branch");

async function getAllByBranchId(req, res) {
  const { branchId } = req.query;
  try {
   
    const branches = await Branch.find();

    if (!branchId) {
      return res.status(200).json({ hasError: false, data: branches });
    }

   
    const departments = await Department.find({ branchId });

   
    return res.status(200).json({
      hasError: false,
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching branches and departments:", error);
    return res.status(500).json({
      message: "Failed to fetch branches and departments",
      error: error.message,
    });
  }
}
module.exports = getAllByBranchId;
