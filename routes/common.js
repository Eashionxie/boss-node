import express from 'express'
import fileController from '../controllers/common/file'
// import socketController from '../controllers/common/socketIO'

const router = express.Router()

router.post('/file-upload', fileController.fileUpload)
// router.post('/socket-connect', socketController.socketConnect)

export default router