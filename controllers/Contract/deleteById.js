// controllers/contract/delete.js
const Contract = require("../../models/Contract");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const contract = await Contract.findByIdAndDelete(id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Contract deleted successfully",
      data: contract,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
