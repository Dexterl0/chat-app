const Message = require('../models/Message');

exports.new_message = async (req, res) => {
    const { chatId, sender, text } = req.body;

    // Create a new message using the data from req.body
    const newMessage = new Message({
        chatId,
        sender,
        text
    });

    try {
        // Save the new message to database and store in variable
        const savedMessage = await newMessage.save();
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
        });
        // Return the messages
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};