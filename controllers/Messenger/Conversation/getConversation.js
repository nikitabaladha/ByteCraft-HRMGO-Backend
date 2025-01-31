const Conversation = require("../../../models/Conversation");
const Users = require("../../../models/User")

const getConversationsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({ members: { $in: [userId] } });
        const conversationUserData = Promise.all(conversations.map(async(conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId)
            const user = await Users.findById(receiverId)
            return {
                user: { receiverId: user._id, email: user.email, name: user.name, profileImage: user.profileImage, role: user.role}, conversationId: conversation._id
            }
            
        }))
        
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.error("Error fetching conversations:", error);
    }
};

module.exports = getConversationsByUserId;
