const TerminationType = require("../../../models/TerminationType");

async function create(req, res) {
  try {
    const { terminationName } = req.body;

    if (!terminationName) {
      return res.status(400).json({ message: "Termination Type Name is required." });
    }

    const newTerminationType = new TerminationType({
      terminationName,
    });

    await newTerminationType.save();

    return res.status(201).json({
      message: "Termination Type created successfully!",
      terminationType: newTerminationType,
    });
  } catch (error) {
    console.error("Error creating termination type:", error);
    return res.status(500).json({
      message: "Failed to create termination type.",
      error: error.message,
    });
  }
}

module.exports = create;
