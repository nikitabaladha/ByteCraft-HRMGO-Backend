const { formatDistance, subMinutes, subMonths } = require("date-fns");
const ContractComment = require("../../../models/ContractComment");
const User = require("../../../models/User");
const Contract = require("../../../models/Contract");

async function getByContractId(req, res) {
  try {
    const { contractId } = req.query;

    // Validate that contractId is provided
    if (!contractId) {
      return res.status(400).json({
        hasError: true,
        message: "Contract ID is required.",
      });
    }

    const contractComments = await ContractComment.find({ contractId })
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "name profileImage",
      });

    if (!contractComments || contractComments.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No comments found for the specified contract ID.",
      });
    }

    const comments = contractComments.map((comment) => {
      const relativeTime = formatDistance(comment.createdAt, new Date(), {
        addSuffix: true,
      });

      return {
        id: comment._id,
        userName: comment?.userId?.name,
        userId: comment.userId._id,
        contractId: comment.contractId,
        comment: comment.comment,
        createdAt: relativeTime,
        updatedAt: comment.updatedAt,
        userAvatar: comment?.userId?.profileImage || null,
      };
    });

    return res.status(200).json({
      hasError: false,
      message: "Comments fetched successfully!",
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching contract comments:", error.message);

    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch comments.",
      error: error.message,
    });
  }
}

module.exports = getByContractId;
