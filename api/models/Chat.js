const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        userIds: [Schema.Types.ObjectId],
        usernames: [String],
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
        hasRead: [{ userId: { type: Schema.Types.ObjectId }, unread: { type: Boolean } }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);