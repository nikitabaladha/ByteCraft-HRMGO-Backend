const ContractCommentValidator = require("../../../validators/ContractValidators/ContractComment");
const ContractComment = require("../../../models/ContractComment");

async function create(req, res) {
  try {
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

    const { contractId, comment } = req.body;

    const newContractComment = new ContractComment({
      userId,
      contractId,
      comment,
    });

    await newContractComment.save();

    return res.status(201).json({
      hasErrors: false,
      message: "Contract Comment created successfully!",
      data: newContractComment,
    });
  } catch (error) {
    console.error("Error creating contract comment:", error);

    return res.status(500).json({
      hasError: true,
      message: "Failed to create contract comment.",
      error: error.message,
    });
  }
}

module.exports = create;
