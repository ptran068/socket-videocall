import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: String,
    image: {
        type: Buffer,
        default: null
    },
    cate: {
        type: String,
        default: '0'
    },
    author: {
        type: ObjectId,
        ref: 'user'
    },
    roomId: {
        type: ObjectId,
        ref: 'room'
    },
    image: String
}, { timestamps: true });

messageSchema.index({ deletedAt: 1 })

module.exports = mongoose.model('message',messageSchema);
