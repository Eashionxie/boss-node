import express from 'express'
import companyController from '../controllers/company/company'

const router = express.Router()

router.get('/get-company-list', companyController.getComList)
router.get('/get-companyInfo', companyController.getComInfoById)
router.post('/add-company', companyController.addCom)
router.get('/get-welfares', companyController.getWelfares)
router.post('/add-album', companyController.addComAlbum)
router.post('/delete-album', companyController.deleteComAlbum)

export default router