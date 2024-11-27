const Trainee = require("../../../models/Trainee"); // Import the Trainee model

const getAllTrainees = async (req, res) => {
  try {
    // Fetch all trainees from the database
    const trainees = await Trainee.find({}, { _id: 0 });

    // Check if there are no trainees
    if (trainees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trainees found",
      });
    }

    // Return the trainees in the response
    return res.status(200).json({
      success: true,
      data: trainees,
    });
  } catch (err) {
    // Handle any errors
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = getAllTrainees;
