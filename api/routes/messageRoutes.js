const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// Add message
router.post("/", messageController.new_message);

// Get message
router.get("/:chatId", messageController.get_messages);

module.exports = router;