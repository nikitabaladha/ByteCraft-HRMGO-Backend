const Trainee = require("../../../models/Trainee"); // Path to the Trainee model
const traineeValidationSchema = require("../../../validators/TraineeValidator");

const createTrainee = async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = traineeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { branch, firstName, lastName, contactNumber, email, expertise, address } = req.body;

    // Check for duplicate email and contact number
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) {
      return res.status(400).json({
        success: false,
        error: "A trainee with this email already exists.",
      });
    }

    // Create a new Trainee
    const trainee = new Trainee({
      branch,
      firstName,
      lastName,
      contactNumber,
      email,
      expertise,
      address,
      name: `${firstName} ${lastName}`,
    });

    await trainee.save();

    return res.status(201).json({
      success: true,
      message: "Trainee created successfully",
      trainee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = createTrainee ;

