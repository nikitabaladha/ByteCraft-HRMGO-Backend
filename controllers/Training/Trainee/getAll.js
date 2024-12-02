const Trainee = require("../../../models/Trainee"); // Import the Trainee model
 
const getAllTrainees = async (req, res) => {
  try {
    // Fetch all trainees from the database
    const trainees = await Trainee.find({}, { __v: 0 }); // Exclude the __v field if unnecessary
 
    // Check if there are no trainees
    if (trainees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trainees found",
      });
    }
 
    // Map trainees to include id explicitly instead of _id if desired
    const responseData = trainees.map((trainee) => ({
      id: trainee._id, // Include id explicitly
      branch: trainee.branch,
      firstName: trainee.firstName,
      lastName: trainee.lastName,
      contactNumber: trainee.contactNumber,
      email: trainee.email,
      expertise: trainee.expertise,
      address: trainee.address,
      createdAt: trainee.createdAt,
      updatedAt: trainee.updatedAt,
    }));
 
    // Return the trainees in the response
    return res.status(200).json({
      success: true,
      data: responseData,
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