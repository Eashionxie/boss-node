import express from 'express'
import userController from '../controllers/user/user'

const router = express.Router()

router.get('/get-openid', userController.getUserOpenid)
router.post('/post-user', userController.postUserInfo)
router.get('/history-search', userController.getUserSearchHistory)
router.post('/history-search-add', userController.postUserSearchHistory)

export default router