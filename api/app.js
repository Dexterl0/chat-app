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
io.use((socket, next) => {
    console.log("WOKRING");
    const username = socket.handshake.auth.username;
    const userId = socket.handshake.auth.userId;
    if (!username || !userId) {
        return next(new Error("Invalid username or userId"));
    }
    socket.username = username;
    socket.userId = userId;
    next();
});

io.on('connection', (socket) => {
    console.log(`User just connected SocketID: ${socket.id}, userId: ${socket.userId}`);

    socket.join(socket.userId);

    socket.on("message", ({ data, to }) => {
        socket.to(to).emit("message", {
            data,
            from: socket.userId,
        });
    });

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