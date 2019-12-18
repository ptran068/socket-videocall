import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    avatar: String,
    password: String,
    roomJoined: [{
        type: ObjectId,
        ref: 'room'
    }],
}, { timestamps: true });

userSchema.index({ deletedAt: 1 })

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        return next(new Error('this email has been using'));
    }
    return  next(error);
});

module.exports = mongoose.model('user',userSchema);
