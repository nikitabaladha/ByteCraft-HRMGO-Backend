const Ticket = require("../../../models/TicketReply");
const mongoose = require("mongoose");

async function getticketreply(req, res) {
  try {
    const { ticketId } = req.params;

    let filter = {};

   
    if (ticketId) {
      if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        return res.status(400).json({
          message: `Invalid ticketId format.`,
          hasError: true
        });
      }
      filter.ticketId = ticketId;
    }

   
    const tickets = await Ticket.find(filter);

    if (tickets.length === 0) {
      return res.status(404).json({
        message: `No ticket replies found.`,
        hasError: true
      });
    }

    return res.status(200).json({
      message: "Tickets fetched successfully.",
      replies:tickets, 
      hasError: false
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({
      message: "Internal server error. Failed to fetch tickets.",
      error: error.message,
      hasError: true
    });
  }
}

module.exports = getticketreply;
