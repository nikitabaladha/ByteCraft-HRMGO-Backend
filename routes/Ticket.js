const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

const  upload  = require('../controllers/uploadImages.js');

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
      createTicket,
      getallticket,
      deleteticket,
      getsingleticket,
      updateticket
} = require("../controllers/Ticket/index.js");

// Define routes
router.post("/create_Ticket",uploadFiles, Middleware, createTicket);              
router.get("/ticket-getall", Middleware, getallticket);   
router.delete("/ticket-delete/:id", Middleware, deleteticket);
router.get("/ticket-get/:id", Middleware, getsingleticket);
router.put("/ticket-update/:id", uploadFiles,Middleware, updateticket);
// router.get("/setsalary-get/:id", Middleware, getSingleSetSalary);    

module.exports = router;

