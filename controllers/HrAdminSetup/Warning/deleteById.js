const Warning = require("../../../models/Warning");

async function deleteById(req, res) {
  try {
    const { id } = req.params;

    const warning = await Warning.findByIdAndDelete(id);

    if (!warning) {
      return res
        .status(404)
        .json({ hasError: true, message: "Warning not found" });
    }

    return res.status(200).json({
      hasError: false,
      message: "Warning deleted successfully",
      data: warning,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
