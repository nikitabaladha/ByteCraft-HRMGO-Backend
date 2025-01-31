const Trainee = require("../../../models/Trainee"); // Path to the Trainee model
const traineeValidationSchema = require("../../../validators/TraineeValidator");

const updateTrainee = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve the trainee ID from the URL parameters
    const { error } = traineeValidationSchema.validate(req.body); // Validate the request body using Joi
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Destructure updated data from the request body
    const { branch, firstName, lastName, contactNumber, email, expertise, address } = req.body;

    // Check if the trainee exists
    const trainee = await Trainee.findById(id);
    if (!trainee) {
      return res.status(404).json({
        success: false,
        error: "Trainee not found.",
      });
    }

    // If email or contactNumber is updated, check if there are duplicates
    if (email && email !== trainee.email) {
      const existingTrainee = await Trainee.findOne({ email });
      if (existingTrainee) {
        return res.status(400).json({
          success: false,
          error: "A trainee with this email already exists.",
        });
      }
    }

    if (contactNumber && contactNumber !== trainee.contactNumber) {
      const existingContactNumber = await Trainee.findOne({ contactNumber });
      if (existingContactNumber) {
        return res.status(400).json({
          success: false,
          error: "A trainee with this contact number already exists.",
        });
      }
    }

    // Update the trainee data
    trainee.branch = branch || trainee.branch;
    trainee.firstName = firstName || trainee.firstName;
    trainee.lastName = lastName || trainee.lastName;
    trainee.contactNumber = contactNumber || trainee.contactNumber;
    trainee.email = email || trainee.email;
    trainee.expertise = expertise || trainee.expertise;
    trainee.address = address || trainee.address;

    // Save the updated trainee data
    await trainee.save();

    return res.status(200).json({
      success: true,
      message: "Trainee updated successfully",
      trainee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = updateTrainee;
