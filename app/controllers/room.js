import RoomNodel from '../models/room'
import ResponseHandle from '../helpers/response-handler'
import ResponseRender from '../helpers/reponse-render'
import MessageModel from '../models/message'

async function create(req, res) {
    const {user, body: { name}} = req
    const avatar = req.file.filename
    if (!name) {
        return ResponseHandle.returnError(res, 'Name is empty')
    }
    const data = {
        name,
        avatar,
        author: user._id
    }
    await RoomNodel.create(data)

    return res.redirect('/room/your-room')
}

async function showYourRoom(req, res) {
    const {user} = req
    const rooms = await RoomNodel.find({author: user._id})

    return ResponseRender.returnRender(res, 'your-room', {rooms})
}

async function deleteYourRoom(req, res) {
    const { id } = req.params
    const {user} = req
    const room = await RoomNodel.findById(id)
    const message = await MessageModel.findOne({ roomId: id})
    await message.remove()
    user.roomJoined.splice(user.roomJoined.indexOf(room.id), 1)
    await user.save()
    await room.remove()

    return res.redirect('/room/your-room')
}

async function show(req, res) {
    const rooms = await RoomNodel.find()
    const user = req.user
    
    return ResponseRender.returnRender(res, 'rooms', {rooms, user})
}

async function showRoomJoined(req, res) {
    const user = req.user
    let rooms = []
    for (const item of user.roomJoined) {
        const data = await RoomNodel.findById(item)
        rooms.push(data)
    }
    return ResponseRender.returnRender(res, 'joined', {rooms})
}

async function leaveGroup(req, res) {
    const { user, params: { id} } = req
    const room = await RoomNodel.findById(id)
    room.members.splice(room.members.indexOf(user.id), 1)
    user.roomJoined.splice(user.roomJoined.indexOf(room.id), 1)
    await room.save()
    await user.save()

    return res.redirect('/')

}

export default {
    create,
    showYourRoom,
    show,
    showRoomJoined,
    leaveGroup,
    deleteYourRoom
}