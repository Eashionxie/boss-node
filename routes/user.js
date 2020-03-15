import express from 'express'
import userController from '../controllers/user/user'

const router = express.Router()

router.get('/get-openid', userController.getUserOpenid)
router.get('/get-info', userController.getUserInfo)
router.post('/post-user', userController.postUserInfo)

export default router