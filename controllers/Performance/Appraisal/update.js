const Appraisal = require("../../../models/Appraisal");

async function update(req, res) {
  try {
    const { id } = req.params; // ID of the appraisal to update
    const { appraisalCompetencies } = req.body; // Updated competencies data

    if (!appraisalCompetencies) {
      return res.status(400).json({
        message: "Appraisal competencies data is required",
        hasError: true,
      });
    }

    // Find the existing Appraisal document
    const appraisal = await Appraisal.findById(id);
    if (!appraisal) {
      return res
        .status(404)
        .json({ message: "Appraisal not found", hasError: true });
    }

    // Function to update ratings for a specific category
    const updateCategoryRatings = (existing, updates) => {
      updates.forEach((update) => {
        const existingCompetency = existing.find(
          (comp) => comp.name === update.name
        );
        if (existingCompetency) {
          existingCompetency.rating = update.rating; // Update the rating
        }
      });
    };

    // Update each category if provided in the request
    if (appraisalCompetencies.organizational) {
      updateCategoryRatings(
        appraisal.appraisalCompetencies.organizational,
        appraisalCompetencies.organizational
      );
    }
    if (appraisalCompetencies.technical) {
      updateCategoryRatings(
        appraisal.appraisalCompetencies.technical,
        appraisalCompetencies.technical
      );
    }
    if (appraisalCompetencies.behavioural) {
      updateCategoryRatings(
        appraisal.appraisalCompetencies.behavioural,
        appraisalCompetencies.behavioural
      );
    }

    // Function to calculate the overall rating
    const calculateOverallRating = (competencies) => {
      let totalRating = 0;
      let totalCount = 0;

      Object.keys(competencies).forEach((category) => {
        competencies[category].forEach((competency) => {
          totalRating += competency.rating;
          totalCount += 1;
        });
      });

      return totalCount > 0
        ? parseFloat((totalRating / totalCount).toFixed(2))
        : 0;
    };

    // Update the overall rating
    appraisal.overAllRating = calculateOverallRating(
      appraisal.appraisalCompetencies
    );

    // Save the updated appraisal
    const updatedAppraisal = await appraisal.save();

    // Return the updated document
    res.status(200).json({
      message: "Appraisal updated successfully",
      data: updatedAppraisal,
      hasError: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = update;
