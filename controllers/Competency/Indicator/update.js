const Indicator = require("../../../models/Indicator");

async function update(req, res) {
  try {
    const { id } = req.params; // The ID of the Indicator to be updated
    const { competencies } = req.body; // Updated competencies data

    // Find the existing Indicator document
    const indicator = await Indicator.findById(id);
    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }

    // Function to update ratings in a given category
    const updateCategoryRatings = (existing, updates) => {
      updates.forEach((update) => {
        const competency = existing.find((comp) => comp.name === update.name);
        if (competency) {
          competency.rating = update.rating; // Update the rating
        }
      });
    };

    // Update ratings for organizational competencies
    if (competencies.organizational) {
      updateCategoryRatings(
        indicator.competencies.organizational,
        competencies.organizational
      );
    }

    // Update ratings for technical competencies
    if (competencies.technical) {
      updateCategoryRatings(
        indicator.competencies.technical,
        competencies.technical
      );
    }

    // Update ratings for behavioural competencies
    if (competencies.behavioural) {
      updateCategoryRatings(
        indicator.competencies.behavioural,
        competencies.behavioural
      );
    }

    // Function to calculate the overall rating
    const calculateOverallRating = (competencies) => {
      let totalRating = 0;
      let totalCompetencies = 0;

      ["organizational", "technical", "behavioural"].forEach((category) => {
        competencies[category].forEach((competency) => {
          totalRating += competency.rating;
          totalCompetencies += 1;
        });
      });

      return totalCompetencies > 0 ? totalRating / totalCompetencies : 0;
    };

    // Recalculate the overall rating after updating ratings
    indicator.overAllRating = calculateOverallRating(indicator.competencies);

    // Save the updated document
    const updatedIndicator = await indicator.save();

    // Return the updated document in the response
    res.status(200).json({
      message: "Indicator updated successfully",
      data: updatedIndicator,
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = update;
