import express from 'express';
import HomeCtrl from '../controllers/home'

const router = express.Router();

router.get('/', HomeCtrl.getHome)



export default router;