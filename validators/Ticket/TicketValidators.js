const Joi = require('joi');


const ticketValidationSchema = Joi.object({
  title: Joi.string().trim().required(), 
  employee_name: Joi.string().trim().required(), 
  priority: Joi.string().valid('low', 'medium', 'high', 'critical').required(), // Enum for priority
  description: Joi.string().required(),
  attachment: Joi.string().uri().optional(), 
  status: Joi.string().valid('open', 'close', 'onhold').default('close'), 
  created_by: Joi.string().valid('HRM', 'Manager', 'Admin').default('HRM'), 
  end_date: Joi.date().default(Date.now), 
});


const validateTicket = (ticketData) => {
  return ticketValidationSchema.validate(ticketData);
};

module.exports = validateTicket;




