const Termination = require("../../../models/Termination");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const termination = await Termination.findByIdAndDelete(id);

    if (!termination) {
      return res.status(404).json({ message: "Termination not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Termination deleted successfully",
      data: Termination,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
