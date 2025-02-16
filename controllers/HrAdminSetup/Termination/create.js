const Termination = require("../../../models/Termination");

const TerminationValidator = require("../../../validators/HrAdminSetupValidators/Termination.js");

async function create(req, res) {
  try {
    const { error } = TerminationValidator.TerminationCreateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const {
      employeeId,
      terminationTypeId,
      noticeDate,
      terminationDate,
      description,
    } = req.body;

    const newTermination = new Termination({
      employeeId,
      terminationTypeId,
      noticeDate,
      terminationDate,
      description,
    });

    await newTermination.save();

    return res.status(201).json({
      hasError: false,
      message: "Termination created successfully",
      data: newTermination,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
