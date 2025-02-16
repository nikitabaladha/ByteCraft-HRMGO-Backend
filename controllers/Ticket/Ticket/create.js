const TicketValidator = require("../../../validators/Ticket/TicketValidators");
const Ticket = require("../../../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const { error } = TicketValidator(req.body);
    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }
    const { title, employee_name, priority, description, status, end_date } =
      req.body;

    let attachment = null;

    if (req.files && req.files.attachment) {
      const TicketImagePath = "/Images/ticketAttachmentImages";
      attachment = `${TicketImagePath}/${req.files.attachment[0].filename}`;
    }

    const newTicket = new Ticket({
      title,
      employee_name,
      priority,
      description,
      attachment,
      status: status || "close",
      end_date: end_date || Date.now(),
    });

    // Save to the database
    await newTicket.save();

    return res.status(201).json({
      message: "Ticket created successfully!",
      ticket: newTicket,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({
      message: "Failed to create ticket.",
      error: error.message,
    });
  }
};

module.exports = createTicket;
