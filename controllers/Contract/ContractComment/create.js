const ContractCommentValidator = require("../../../validators/ContractValidators/ContractComment");
const ContractComment = require("../../../models/ContractComment");

async function create(req, res) {
  try {
    // Validate the request body
    const { error } =
      ContractCommentValidator.ContractCommentCreateValidator.validate(
        req.body
      );
    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        hasError: true,
        message: errorMessages,
      });
    }

    const userId = req.user.id;

    // Extract validated data from req.body
    const { contractId, comment } = req.body;

    // Create a new ContractComment instance
    const newContractComment = new ContractComment({
      userId,
      contractId,
      comment,
    });

    // Save the comment to the database
    await newContractComment.save();

    // Send a success response
    return res.status(201).json({
      hasErrors: false,
      message: "Contract Comment created successfully!",
      data: newContractComment,
    });
  } catch (error) {
    console.error("Error creating contract comment:", error);

    // Handle server error
    return res.status(500).json({
      hasError: true,
      message: "Failed to create contract comment.",
      error: error.message,
    });
  }
}

module.exports = create;
