const Chat = require('../models/Chat');
const User = require('../models/User');

exports.new_chat = async (req, res) => {
    const { senderId, receiverId } = req.body;

    // Search for an existing chat that contains the users IDs
    const existingChat = await Chat.findOne({ userIds: [senderId, receiverId] });
    // If an existing chat exists, return the existing chat
    if (existingChat) {
        res.status(500).json(existingChat)
    } else {
        // If an existing chat does not exist, create a new chat containing the users IDs, usernames the hasRead array

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        /* hasRead array contains an object for each user in the chat that contains the user ID and a boolean for whether
         the associated user has unread messages */
        const newChat = new Chat({
            userIds: [sender._id, receiver._id],
            usernames: [sender.username, receiver.username],
            hasRead: [{ userId: senderId, unread: false }, { userId: receiverId, unread: false }]
        });

        try {
            // Save the new chat to database and return it
            const savedChat = await newChat.save();
            res.status(200).json(savedChat);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

exports.get_chat = async (req, res) => {
    const { userId } = req.params;
    try {
        // Find and return chats that include the users user ID
        const chat = await Chat.find({
            userIds: { $in: [userId] }
        }).populate('messages');
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.set_hasRead = async (req, res) => {
    const { chatId, userId } = req.body;
    try {
        // Find the chat using the chatId
        const chat = await Chat.findById(chatId);
        // Find object with the matching userId in the hasRead property and set its unread property to false
        chat.hasRead.find((u) => {
            if (u.userId.toString() === userId) {
                u.unread = false;
                return u;
            }
        });
        // Save the modified chat to database
        const updatedChat = await chat.save();
        res.status(200).json({
            updatedChat
        });
    } catch (err) {
        res.status(500).json(err);
    }
};