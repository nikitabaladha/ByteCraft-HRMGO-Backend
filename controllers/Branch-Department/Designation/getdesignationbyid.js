const Designation = require("../../../models/Designation");

async function getByDesignationId(req, res) {
  const { designationId } = req.params;

  try {
    if (!designationId) {
      return res.status(400).json({ message: "Designation ID is required" });
    }

    const designation = await Designation.findById(designationId);

    if (!designation) {
      return res.status(404).json({
        message: "No designation found for the provided ID",
      });
    }

    return res.status(200).json({
      message: "Designation fetched successfully!",
      data: designation,
    });
  } catch (error) {
    console.error("Error fetching designation:", error);
    return res.status(500).json({
      message: "Failed to fetch designation",
      error: error.message,
    });
  }
}

module.exports = getByDesignationId;
