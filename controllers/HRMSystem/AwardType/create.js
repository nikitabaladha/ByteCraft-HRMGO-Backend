const AwardType = require("../../../models/AwardType");

async function create(req, res) {
  try {
    const { awardName } = req.body;

    if (!awardName) {
      return res.status(400).json({ message: "Award Type Name is required." });
    }

    const newAwardType = new AwardType({
      awardName,
    });

    await newAwardType.save();

    return res.status(201).json({
      message: "Award Type created successfully!",
      awardType: newAwardType,
    });
  } catch (error) {
    console.error("Error creating award type:", error);
    return res.status(500).json({
      message: "Failed to create award type.",
      error: error.message,
    });
  }
}

module.exports = create;
