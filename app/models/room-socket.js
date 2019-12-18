import mongoose from 'mongoose';
import { RoomSocket } from '.';
import to from '../helpers/to';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const socket = new Schema({
  socketId: {
    type: String,
    default: '',
  },
  roomId: {
    type: ObjectId,
    ref: 'room'
  },
  peerID: String,
}, {
  versionKey: false,
});

socket.static('newDoc', async (data) => {
  const socket = new RoomSocket(data);
  const result = await to(socket.save());
  return result;
});

socket.static('deleteByCondition', async (condition) => {
  await RoomSocket.deleteOne(condition);
});

socket.static('getSocketIds', async (roomId) => {
  const sockets = await RoomSocket.find({ roomId });
  const socketIds = sockets.map(item => item.socketId);
  return socketIds;
});

module.exports = mongoose.model('RoomSocket', socket);