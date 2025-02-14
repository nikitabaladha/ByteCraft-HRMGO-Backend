// controllers/contract/delete.js
const Contract = require("../../../models/Contract");
const getAll = require("./getAll");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const contract = await Contract.findByIdAndDelete(id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    return getAll(req, res);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
