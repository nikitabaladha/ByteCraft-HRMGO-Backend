const Ticket = require("../../../models/Ticket");
const TicketReply = require("../../../models/TicketReply");
const TicketValidator = require("../../../validators/Ticket/TicketReplyValidators");

async function createticketreply(req, res) {
  try {
    const { error } = TicketValidator.validate(req.body);
    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        message: `Validation error: ${errorMessages}`,
        hasError: true,
      });
    }

    const { description, ticketId } = req.body;

    let attachment = null;  

    if (req.files && req.files.attachment) {
      const TicketReplyImagePath = "/Images/ticketReplyAttachmentImages";
      attachment = `${TicketReplyImagePath}/${req.files.attachment[0].filename}`;
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found.",
        hasError: true,
      });
    }

    const newTicketReply = new TicketReply({
      ticketId: ticket._id,
      description,
      attachment,
    });

    await newTicketReply.save();

    return res.status(201).json({
      message: "Ticket reply created successfully.",
      ticketReply: newTicketReply,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating ticket reply:", error);
    return res.status(500).json({
      message: "Internal server error. Failed to create ticket reply.",
      error: error.message || error,
      hasError: true,
    });
  }
}

module.exports = createticketreply;
