const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');

// Create new chat
router.post("/", chatController.new_chat);

// Set a users hasRead property
router.post("/setHasRead", chatController.set_hasRead);

// Get chat of a user
router.get("/:userId", chatController.get_chat);

module.exports = router;