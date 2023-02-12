const Message = require('../models/Message');
const Chat = require('../models/Chat');

exports.new_message = async (req, res) => {
    const { chatId, senderId, username, text } = req.body;

    // Create a new message using the data from req.body
    const newMessage = new Message({
        chatId,
        senderId,
        username,
        text
    });

    try {
        // Save the new message to database and store in variable
        const savedMessage = await newMessage.save();

        // Find the chat and push the new message ID to the chats messages array
        const chat = await Chat.findById(chatId);
        chat.messages.push(savedMessage._id);
        // Set the unread property to true for all users in the chat except the sender
        chat.hasRead.map((u) => {
            if (u.userId.toString() !== senderId) {
                u.unread = true;
                return u;
            }
        });

        chat.save();
        // Return the new message
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.get_messages = async (req, res) => {
    const { chatId } = req.params;

    try {
        // Search for messages that match the chatId
        const messages = await Message.find({
            chatId: chatId
        }).sort({createdAt: -1});
        // Return the messages
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.get_message = async (req, res) => {
    const { messageId } = req.params;

    try {
        // Search For message by Id
        const message = await Message.findById(messageId);
        // Return the message
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
}