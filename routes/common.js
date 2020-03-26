import express from 'express'
import fileController from '../controllers/common/file'
import locationController from '../controllers/common/location'
// import socketController from '../controllers/common/socketIO'

const router = express.Router()

router.post('/file-upload', fileController.fileUpload)
router.get('/address-by-coordinate', locationController.coordinate2Address)
// router.post('/socket-connect', socketController.socketConnect)

export default router