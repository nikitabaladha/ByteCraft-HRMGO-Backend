// controllers/Award/delete.js
const Award = require("../../../models/Award");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const award = await Award.findByIdAndDelete(id);

    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Award deleted successfully",
      data: award,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
