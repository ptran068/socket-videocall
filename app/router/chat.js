import express from 'express';
import ChatCtrl from '../controllers/chat'
import upload from '../helpers/multer'

const router = express.Router();

// router.get('/', ChatCtrl.showChatRoom)
router.get('/join-room/:id', ChatCtrl.joinRoomChat)
router.post('/send-image', upload.single('image'))

export default router;