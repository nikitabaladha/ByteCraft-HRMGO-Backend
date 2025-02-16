const Termination = require("../../../models/Termination");
const TerminationValidator = require("../../../validators/HrAdminSetupValidators/Termination.js");

async function updateById(req, res) {
  try {
    const { id } = req.params;

    const { error } = TerminationValidator.TerminationUpdateValidator.validate(
      req.body
    );

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { terminationTypeId, noticeDate, terminationDate, description } =
      req.body;

    const termination = await Termination.findById(id);
    if (!termination) {
      return res.status(404).json({ message: "Termination not found" });
    }

    termination.terminationTypeId =
      terminationTypeId || termination.terminationTypeId;
    termination.noticeDate = noticeDate || termination.noticeDate;
    termination.terminationDate =
      terminationDate || termination.terminationDate;
    termination.description = description || termination.description;

    await termination.save();

    return res.status(200).json({
      hasError: false,
      message: "Termination updated successfully",
      data: termination,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = updateById;
