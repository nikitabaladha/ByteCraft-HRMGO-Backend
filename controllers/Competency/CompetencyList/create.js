const CompetencyListValidator = require("../../../validators/CompetencyValidators/CompetencyListValidator");
const CompetencyList = require("../../../models/CompetencyList");

async function create(req, res) {
  try {
    // Validate the incoming data using Joi schema
    const { error } = CompetencyListValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { competencyListName, competencyId } = req.body;

    // Create and save the new CompetencyList
    const newCompetencyList = new CompetencyList({
      competencyListName,
      competencyId,
    });

    // Save the new CompetencyList to the database
    await newCompetencyList.save();

    return res.status(201).json({
      message: "Competency List created successfully!",
      data: newCompetencyList,
    });
  } catch (error) {
    console.error("Error creating competency list:", error);
    return res.status(500).json({
      message: "Failed to create competency list.",
      error: error.message,
    });
  }
}

module.exports = create;
