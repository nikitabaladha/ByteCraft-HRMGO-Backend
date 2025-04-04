const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");
const upload = require("../controllers/messageAttactment.js");

const uploadFiles = (req, res, next) => {
  upload.fields([
    { name: "messageFile", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

// Controller imports
const {
  createConversation,
  getConversationsByUserId,
  createMessage,
  getMessageById,
  userById,
  deleteConversation,
  markMessagesAsRead,
  unreadCount
} = require("../controllers/Messenger/index.js");

// Define routes
router.post("/conversation", Middleware, createConversation )
router.get("/conversation/:userId", Middleware, getConversationsByUserId)
router.post("/message",uploadFiles, Middleware, createMessage)
router.get("/get-message/:conversationId", Middleware, getMessageById)
router.get("/users/:userId", Middleware, userById)
router.delete("/delete-conversation/:conversationId", Middleware, deleteConversation)
router.post("/messages/mark-as-read", Middleware, markMessagesAsRead);
router.get("/unread-messages/:userId", Middleware, unreadCount);

module.exports = router;