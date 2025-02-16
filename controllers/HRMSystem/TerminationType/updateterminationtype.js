const TerminationType = require("../../../models/TerminationType");

async function update(req, res) {
  try {
    const { terminationName } = req.body;
    const { id } = req.params;

    const terminationType = await TerminationType.findById(id);

    if (!terminationType) {
      return res.status(404).json({ message: "Termination Type not found." });
    }

    terminationType.terminationName =
      terminationName || terminationType.terminationName;

    await terminationType.save();

    return res.status(200).json({
      message: "Termination Type updated successfully!",
      terminationType,
    });
  } catch (error) {
    console.error("Error updating termination type:", error);
    return res.status(500).json({
      message: "Failed to update termination type.",
      error: error.message,
    });
  }
}

module.exports = update;
