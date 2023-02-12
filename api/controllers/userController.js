const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = async (req, res) => {
    const { email, username, password, confirmPassword } = req.body;

    // Check if a user with the email entered already exists
    const existingUser = await User.findOne({ email: email });

    // If a user with the email entered already exists, return error message
    if (existingUser) {
        return res.status(400).json({
            error: "Account with that email already exists"
        });
    }

    // If any of the fields are not entered, return error message
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({
            error: "All fields must be entered"
        });
    }

    // If password and confirmPassword do not match, return error message
    if (password !== confirmPassword) {
        return res.status(400).json({
            error: "Passwords do not match"
        });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = new User({
        email,
        username,
        password: hashedPassword
    });

    // Save the new user to database and store in variable
    const savedUser = await user.save();

    // Create jwt token
    const token = jwt.sign({
        _id: savedUser._id,
        username: savedUser.username
    }, process.env.JWT_SECRET);

    // Return token cookie and success message
    res.status(200).cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).json({
        message: "Signup Successful"
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // If any fields are not entered, return error message
    if (!email || !password) {
        return res.status(400).json({
            error: "All fields must be entered"
        });
    }

    // Check if a user with the entered email exists
    const existingUser = await User.findOne({ email: email });

    // If a user with the entered email does not exist, return error message
    if (!existingUser) {
        return res.status(400).json({
            error: "Incorrect email or password"
        });
    }

    // Use bcrypt compare to check if password matches the existing users password
    const correctPassword = await bcrypt.compare(password, existingUser.password);

    // If password does not match the existing users password, return error message
    if (!correctPassword) {
        return res.status(400).json({
            error: "Incorrect email or password"
        });
    }

    // Create jwt token
    const token = jwt.sign({
        _id: existingUser._id,
        username: existingUser.username
    }, process.env.JWT_SECRET);

    // Return token cookie and success message
    res.status(200).cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).json({
        message: "Login Successful"
    });
};

exports.logout = (req, res) => {
    // Return token cookie as an empty string that expires immediately & success message
    res.status(200).cookie('token', "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).json({
        message: "Logged out Successfully"
    });
};


exports.loggedIn = (req, res) => {
    try {
        const token = req.cookies.token;

        // If there is no token cookie, return _id as an empty string
        if (!token) {
            return res.status(400).json({
                user: {
                    _id: "",
                    username: ""
                }
            });
        }

        // Verify token and store in variable
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Return _id from verified token
        res.status(200).json({
            user
        });

    } catch (err) {
        res.status(400).json({
            user: {
                _id: "",
                username: ""
            }
        });
    }
};

exports.getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        // Find user and return users username
        const user = await User.findById(userId);
        res.status(200).json({
            username: user.username
        });
    } catch (err) {
        res.status(400).json({ err });
    }
};

exports.userList = async (req, res) => {
    const { userId } = req.params;
    try {
        // Find all users that do not equal userId and return username and _id fields
        const users = await User.find({ _id: { $ne: userId } }).select(['username', '_id']);
        res.status(200).json({
            users
        });
    } catch (err) {
        res.status(400).json({ err });
    }
};