const Chat = require('../models/Chat');

exports.new_chat = async (req, res) => {
    const { senderId, receiverId } = req.body;

    // Search for an existing chat that contains the users IDs
    const existingChat = await Chat.findOne({ user: [senderId, receiverId] });

    // If an existing chat exists, return the existing chat
    if (existingChat) {
        res.status(500).json(existingChat)
    } else {
        // If an existing chat does not exist, create a new chat containing the users IDs
        const newChat = new Chat({
            users: [senderId, receiverId]
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
        // Find and return   chats that include the users user ID
        const chat = await Chat.find({
            user: { $in: [userId] }
        });
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
};