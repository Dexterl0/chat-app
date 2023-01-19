const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Signup
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

// Logout
router.get('/logout', userController.logout);

// Check if user is logged in and return _id
router.get('/loggedin', userController.loggedIn);

// Find all users and return username
router.get('/userlist/:userId', userController.userList);

// Find user and return username
router.get('/:userId', userController.getUser);

module.exports = router;