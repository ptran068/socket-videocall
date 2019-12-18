import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

let roomSchema = new Schema({
    name: String,
    author: {
        type: ObjectId,
        ref: 'User'
    },
    avatar: String,
    members: [{
        type: ObjectId,
        ref: 'User'
    }],
    listUser: [{
      type: ObjectId,
      ref: 'User'
    }]
}, { timestamps: true });

roomSchema.index({ deletedAt: 1 })

module.exports = mongoose.model('room',roomSchema);
