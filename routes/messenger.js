const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createConversation,
  getConversationsByUserId,
  createMessage,
  getMessageById,
  userById
} = require("../controllers/Messenger/index.js");

// Define routes
router.post("/conversation", Middleware, createConversation )
router.get("/conversation/:userId", Middleware, getConversationsByUserId)
router.post("/message", Middleware, createMessage)
router.get("/get-message/:conversationId", Middleware, getMessageById)
router.get("/users/:userId", Middleware, userById)

module.exports = router;
