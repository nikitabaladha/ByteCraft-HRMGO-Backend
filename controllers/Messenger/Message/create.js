// const Conversation = require("../../../models/Conversation");
// const Messages = require("../../../models/Messenger");
 
// const createMessage = async (req, res) => {
//   try {
//     const { conversationId, senderId, message, receiverId = "" } = req.body;
 
//     if (!senderId || (!message && !req.files?.messageFile)) {
//       return res.status(400).send("Please provide a message or file.");
//     }
 
//     let messageFile = null;
 
//     if (req.files?.messageFile && req.files.messageFile[0]) {
//       const file = req.files.messageFile[0];
//       const filePath = file.mimetype.startsWith("image/")
//         ? `/Images/MessageFile/${file.filename}`
//         : file.mimetype === "application/pdf"
//         ? `/Documents/MessageFile/${file.filename}`
//         : null;
 
//       if (!filePath) {
//         return res.status(400).send("Invalid file type.");
//       }
//       messageFile = filePath;
//     }
 
//     if (conversationId === "new" && receiverId) {
//       const newConversation = new Conversation({
//         members: [senderId, receiverId],
//       });
//       await newConversation.save();
 
//       const newMessage = new Messages({
//         conversationId: newConversation._id,
//         senderId,
//         message: message || null,
//         messageFile: messageFile || null,
//       });
//       await newMessage.save();
//       return res.status(200).send("Message sent successfully.");
//     }
 
//     if (!conversationId && receiverId) {
//       return res
//         .status(400)
//         .send("Please provide a conversation ID or receiver ID.");
//     }
 
//     const newMessage = new Messages({
//       conversationId,
//       senderId,
//       message: message || null,
//       messageFile: messageFile || null,
//     });
//     await newMessage.save();
 
//     res.status(200).send("Message sent successfully.");
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };
 
// module.exports = createMessage;

const Conversation = require("../../../models/Conversation");
const Messages = require("../../../models/Messenger");
 
const createMessage = async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;
 
    if (!senderId || (!message && !req.files?.messageFile)) {
      return res.status(400).send("Please provide a message or file.");
    }
 
    let messageFile = null;
 
    if (req.files?.messageFile && req.files.messageFile[0]) {
      const file = req.files.messageFile[0];
      const filePath = file.mimetype.startsWith("image/")
        ? `/Images/MessageFile/${file.filename}`
        : file.mimetype === "application/pdf"
        ? `/Documents/MessageFile/${file.filename}`
        : null;
 
      if (!filePath) {
        return res.status(400).send("Invalid file type.");
      }
      messageFile = filePath;
    }
 
    let conversation = null;
    if (conversationId === "new" && receiverId) {
      conversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });
 
      if (!conversation) {
        conversation = new Conversation({
          members: [senderId, receiverId],
        });
        await conversation.save();
      }
    } else if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(400).send("Invalid conversation ID.");
      }
    } else if (receiverId) {
      conversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });
 
      if (!conversation) {
        return res
          .status(400)
          .send("Please provide a valid conversation ID or receiver ID.");
      }
    }
 
    const newMessage = new Messages({
      conversationId: conversation._id,
      senderId,
      message: message || null,
      messageFile: messageFile || null,
    });
    await newMessage.save();
 
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Internal Server Error");
  }
};
 
module.exports = createMessage;