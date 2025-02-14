const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

const  upload  = require('../controllers/uploadimagesticketreply.js');

const uploadFiles = (req, res, next) => {
      upload.fields([
        { name: "attachment", maxCount: 1 },
      
      ])(req, res, (err) => {
        if (err) {
          return next(err);
        }
        next();
      });
    };



// Import controllers
const {
      createticketreply,
      getticketreply,
     
} = require("../controllers/Ticket/index.js");
const middleware = require("../middleware/index.js");

// Define routes
router.post("/create_TicketReply", uploadFiles,Middleware, createticketreply);  
router.get("/ticket-reply/:ticketId",middleware,getticketreply)            
 

module.exports = router;

