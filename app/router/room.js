import RoomCtrl from '../controllers/room'
import {Router} from 'express'
import upload from '../helpers/multer'

const router = Router()

router.post('/create', upload.single('avatar'), RoomCtrl.create)
router.get('/your-room', RoomCtrl.showYourRoom)
router.get('/show', RoomCtrl.show)
router.get('/room-joined', RoomCtrl.showRoomJoined)
router.get('/leave-room/:id', RoomCtrl.leaveGroup)
router.get('/delete-room/:id', RoomCtrl.deleteYourRoom)

export default router