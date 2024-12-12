const { formatDistance, subMinutes, subMonths } = require("date-fns");
const ContractNote = require("../../../models/ContractNote");
const User = require("../../../models/User");
const Contract = require("../../../models/Contract");

async function getByContractId(req, res) {
  try {
    const { contractId } = req.query;

    if (!contractId) {
      return res.status(400).json({
        hasError: true,
        message: "Contract ID is required.",
      });
    }

    const ContractNotes = await ContractNote.find({ contractId })
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "firstName lastName",
      });

    if (!ContractNotes || ContractNotes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No notes found for the specified contract ID.",
      });
    }

    const notes = ContractNotes.map((note) => {
      const relativeTime = formatDistance(note.createdAt, new Date(), {
        addSuffix: true,
      });

      return {
        id: note._id,
        userName: `${note.userId.firstName} ${note.userId.lastName}`,
        userId: note.userId._id,
        contractId: note.contractId,
        note: note.note,
        createdAt: relativeTime,
        updatedAt: note.updatedAt,
      };
    });

    return res.status(200).json({
      hasError: false,
      message: "Notes fetched successfully!",
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching contract notes:", error.message);

    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch notes.",
      error: error.message,
    });
  }
}

module.exports = getByContractId;
