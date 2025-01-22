const Messages = require("../../../models/Messenger");
const Users = require("../../../models/User")

const getMessageById = async(req, res) => {
    try{
        const conversationId= req.params.conversationId;
        if(conversationId == "new") return res.status(200).json([])
        const messages = await Messages.find({conversationId});
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId);
            return { user: {id: user._id, email: user.email, name: user.name, profileImage: user.profileImage}, message: message.message}
        }))
        res.status(200).json(await messageUserData);
    } catch (error) {
        console.log('Error', error)
    }
}

module.exports = getMessageById;