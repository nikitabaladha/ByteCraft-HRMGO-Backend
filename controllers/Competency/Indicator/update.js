const Indicator = require("../../../models/Indicator");

async function update(req, res) {
  try {
    const { id } = req.params;
    const { competencies } = req.body;

    const indicator = await Indicator.findById(id);
    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }

    const updateCategoryRatings = (existing, updates) => {
      updates.forEach((update) => {
        const competency = existing.find((comp) => comp.name === update.name);
        if (competency) {
          competency.rating = update.rating;
        }
      });
    };

    if (competencies.organizational) {
      updateCategoryRatings(
        indicator.competencies.organizational,
        competencies.organizational
      );
    }

    if (competencies.technical) {
      updateCategoryRatings(
        indicator.competencies.technical,
        competencies.technical
      );
    }

    if (competencies.behavioural) {
      updateCategoryRatings(
        indicator.competencies.behavioural,
        competencies.behavioural
      );
    }

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

    indicator.overAllRating = calculateOverallRating(indicator.competencies);

    const updatedIndicator = await indicator.save();

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
