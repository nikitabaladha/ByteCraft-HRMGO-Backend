const Resignation = require("../../../models/Resignation");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const resignation = await Resignation.findByIdAndDelete(id);

    if (!resignation) {
      return res.status(404).json({ message: "Resignation not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Resignation deleted successfully",
      data: resignation,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
