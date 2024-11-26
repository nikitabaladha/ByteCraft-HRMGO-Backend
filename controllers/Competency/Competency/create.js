const CompetencyValidator = require("../../../validators/CompetencyValidators/CompetencyValidator");
const Competency = require("../../../models/Competency");

// Create branch logic
async function create(req, res) {
  try {
    // Validate the Announcement data using Joi schema
    const { error } = CompetencyValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { competencyType } = req.body;

    // Create and save the new branch
    const newCompetency = new Competency({
      competencyType,
    });

    await newCompetency.save();

    return res.status(201).json({
      message: "Competency created successfully!",
      branch: newCompetency,
    });
  } catch (error) {
    console.error("Error creating competency:", error);
    return res.status(500).json({
      message: "Failed to create competency.",
      error: error.message,
    });
  }
}

module.exports = create;
