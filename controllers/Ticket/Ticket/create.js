const TicketValidator = require("../../../validators/Ticket/TicketValidators");  
const Ticket = require("../../../models/Ticket"); 

const createTicket = async (req, res) => {
  try {
    const { error } = TicketValidator(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

  
    const { title, employee_name, priority, description, status, end_date } = req.body;


    console.log('File uploaded:', req.file);


    const attachment = req.file ? req.file.path : null;  

    // Create a new ticket instance
    const newTicket = new Ticket({
      title,
      employee_name,
      priority,
      description,
      attachment,  
      status: status || "close",
      end_date: end_date || Date.now(),
    });

  
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
// controllers/Ticket/index.js
// const TicketValidator = require("../../../validators/Ticket/TicketValidators");
// const Ticket = require("../../../models/Ticket");
// const upload = require('../../../middleware/upload');
// createTicket = async (req, res) => {
//     try {
//       const { title, employee_name, priority, description, status, end_date } = req.body;
  
//       // Validate data using Joi
//       const { error } = TicketValidator.validate(req.body);
//       if (error) {
//         return res.status(400).json({ message: error.details[0].message, hasError: true });
//       }
  
//       // Get the uploaded file URL (if any)
//       const attachment = req.file ? req.file.location : null; // If file uploaded, get the file URL
  
//       // Save the ticket to the database
//       const newTicket = new Ticket({
//         title,
//         employee_name,
//         priority,
//         description,
//         status: status || 'close',
//         end_date,
//         attachment, // Save the URL of the uploaded file
//       });
  
//       await newTicket.save();
  
//       return res.status(201).json({
//         message: 'Ticket created successfully!',
//         ticket: newTicket,
//         hasError: false,
//       });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error creating ticket.', hasError: true });
//     }
//   };
  
//   module.exports = createTicket;