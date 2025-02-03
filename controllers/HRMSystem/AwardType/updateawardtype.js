const AwardType = require("../../../models/AwardType");

async function update(req, res) {
  try {
    const { awardName } = req.body;
    const { id } = req.params;

    const awardType = await AwardType.findById(id);

    if (!awardType) {
      return res.status(404).json({ message: "Award Type not found." });
    }

    awardType.awardName = awardName || awardType.awardName;

    await awardType.save();

    return res.status(200).json({
      message: "Award Type updated successfully!",
      awardType,
    });
  } catch (error) {
    console.error("Error updating award type:", error);
    return res.status(500).json({
      message: "Failed to update award type.",
      error: error.message,
    });
  }
}

module.exports = update;
