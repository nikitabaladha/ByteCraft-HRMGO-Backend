const ContractNoteValidator = require("../../../validators/ContractValidators/ContractNote");
const ContractNote = require("../../../models/ContractNote");

async function create(req, res) {
  try {
    const { error } =
      ContractNoteValidator.ContractNoteCreateValidator.validate(req.body);
    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        success: false,
        message: errorMessages,
      });
    }

    const userId = req.user.id;

    const { contractId, note } = req.body;

    const newContractNote = new ContractNote({
      userId,
      contractId,
      note,
    });

    await newContractNote.save();

    return res.status(201).json({
      success: true,
      message: "Contract Note created successfully!",
      data: newContractNote,
    });
  } catch (error) {
    console.error("Error creating contract Note:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create contract note.",
      error: error.message,
    });
  }
}

module.exports = create;
