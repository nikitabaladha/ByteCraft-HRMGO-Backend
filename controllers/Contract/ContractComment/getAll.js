const ContractComment = require("../../../models/ContractComment");
const User = require("../../../models/User");
const Contract = require("../../../models/Contract");

async function getAll(req, res) {
  try {
    // Fetch all contract comments with populated data for `userId` and `contractId`, sorted by createdAt in descending order
    const contractComments = await ContractComment.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate({
        path: "userId",
        select: "firstName lastName",
      })
      .populate({
        path: "contractId",
      });

    // Format the response data
    const response = contractComments.map((comment) => ({
      id: comment._id,
      userName: `${comment.userId.firstName} ${comment.userId.lastName}`,
      userId: comment.userId._id,
      contractId: comment.contractId._id,
      comment: comment.comment,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));

    // Send the response
    return res.status(200).json({
      success: true,
      message: "Contract Comments fetched successfully!",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching contract comments:", error.message);

    // Handle server error
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contract comments.",
      error: error.message,
    });
  }
}

module.exports = getAll;
