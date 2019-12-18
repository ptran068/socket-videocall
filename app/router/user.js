import express from 'express';
import UserCtrl from '../controllers/user'
import upload from '../helpers/multer'

const router = express.Router();

router.get('/login', UserCtrl.getLoginPage)
router.post('/sign-up', upload.single('avatar'), UserCtrl.addUser)
router.post('/login', UserCtrl.login)
router.get('/log-out', UserCtrl.logout)



export default router;