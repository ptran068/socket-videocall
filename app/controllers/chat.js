import ResponseRender from '../helpers/reponse-render'
import {RoomModel, MessageModel} from '../models'
import socketHandel from '../modules/socket'


async function joinRoomChat(req, res) {
    const { user, params: { id } } = req
    const room = await RoomModel.findById(id)
    const members = room.members.toString()
    if (!members.includes(user.id.toString())) {
        room.members.push(user._id)
    }
    await room.save()
    const messages = room ? await MessageModel.find({roomId: room._id}).populate('author') : []
    const listRoom = user.roomJoined.toString()
    if (!listRoom.includes(room._id.toString())) {
        user.roomJoined.push(room._id)
        await user.save()
    }
    return ResponseRender.returnRender(res, 'chat', {user, messages, room})
}


export default {
    // showChatRoom,
    joinRoomChat
}