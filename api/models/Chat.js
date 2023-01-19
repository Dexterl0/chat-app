const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        users: {
            type: Array,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);