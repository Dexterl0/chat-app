const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createServer } = require('http')
const { Server } = require('socket.io');
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

require('dotenv').config();

// Socket.io
io.on('connection', (socket) => {
    console.log(`${socket.id} user just connected`);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');

mongoose.connect(process.env.DB);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser());

// Api Routes
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

httpServer.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});