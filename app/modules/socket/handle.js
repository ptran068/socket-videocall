
import {UserModel, RoomModel, RoomSocket, MessageModel} from '../../models'
const io = require('socket.io')();

io.use((socket, next) => {
  let { userId } = socket.handshake.query;
  if (userId) {
      socket.userId = userId;
  }
  next();
});

const emitToSocketId = (socketId, event, data) => {
  io.to(socketId).emit(event, data);
};

const emitToSocketIds = (socketIds, event, data) => {
  socketIds.forEach(socketId => emitToSocketId(socketId, event, data));
};

let listUserOnline = []

const init = () => {
  io.on('connection', (socket) => {

    socket.on("room", async ({roomId, id}) => {
      RoomSocket.newDoc({socketId: socket.id, roomId: roomId, peerID: id})
      
      const user = await UserModel.findById(socket.userId).select('name avatar')
      let b = Object.assign({}, user)
      b._doc = Object.assign(b._doc, {peerID: id})
      listUserOnline.push(b._doc)
      const socketIds = await RoomSocket.getSocketIds(roomId);
      
      emitToSocketIds(socketIds, 'user-online', listUserOnline);
    })

    socket.on('disconnect', async () => {
      const user = await UserModel.findById(socket.userId).select('name avatar')
      listUserOnline.splice( listUserOnline.indexOf(user), 1 );
      console.log('Have a user leave room');
      RoomSocket.deleteByCondition({ socketId: socket.id });
      socket.emit('out-room', listUserOnline)
    });
    
    socket.on('message', async function ({content, roomId}) {
      const data = {
        author: socket.userId,
        content,
        roomId
      }
      let message = await MessageModel.create(data)
      message = await MessageModel.findById(message._id).populate({ path: 'author', select: 'name avatar' });
      const socketIds = await RoomSocket.getSocketIds(roomId);
      emitToSocketIds(socketIds, 'newMessage', { message });

    })

    socket.on('send-image', async data => {
      const buff = new Buffer(data.image, 'utf-8');
      const newData = {
        cate : 1,
        roomId : data.roomId,
        author : socket.userId,
        image : buff
      }
      let image = await MessageModel.create(newData)
      image = await MessageModel.findById(image._id).populate({ path: 'author', select: 'name avatar' });
      const socketIds = await RoomSocket.getSocketIds(newData.roomId);
      emitToSocketIds(socketIds, 'send-message-image', { image });
    })
  });
};


export default {
  io,
  init,
};