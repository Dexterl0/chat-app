const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// Add message
router.post("/", messageController.new_message);

// Get messages
router.get("/:chatId", messageController.get_messages);

// Get single message
router.get("/message/:messageId", messageController.get_message);

module.exports = router;