import express from 'express'
import fileController from '../controllers/common/file'
import locationController from '../controllers/common/location'
import messageServeController from '../controllers/common/messageServe'
// import socketController from '../controllers/common/socketIO'

const router = express.Router()

router.post('/file-upload', fileController.fileUpload)
router.get('/file-citys', fileController.cityData)
router.get('/address-by-coordinate', locationController.coordinate2Address)
router.get('/auth-code', messageServeController.sendAliMessage)
router.post('/sign-up', messageServeController.userSignUp)
router.post('/login', messageServeController.userLogin)

// router.post('/socket-connect', socketController.socketConnect)

export default router