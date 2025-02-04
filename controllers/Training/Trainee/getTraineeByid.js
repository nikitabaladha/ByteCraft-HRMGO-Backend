const Trainee = require("../../../models/Trainee");
const getTraineeById = async (req, res) => {
    try {
      const { id } = req.params; // Get the trainee ID from URL parameters
  
      // Fetch the trainee by ID
      const trainee = await Trainee.findById(id, { __v: 0 });
  
      // Check if trainee is found
      if (!trainee) {
        return res.status(404).json({
          success: false,
          message: "Trainee not found",
        });
      }
  
      // Format the response
      const responseData = {
        id: trainee._id,
        branch: trainee.branch,
        firstName: trainee.firstName,
        lastName: trainee.lastName,
        contactNumber: trainee.contactNumber,
        email: trainee.email,
        expertise: trainee.expertise,
        address: trainee.address,
        createdAt: trainee.createdAt,
        updatedAt: trainee.updatedAt,
      };
  
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
  
  module.exports = getTraineeById;
  