import express from 'express'
import companyController from '../controllers/company/company'

const router = express.Router()

router.get('/get-company-list', companyController.getComList)
router.get('/get-companyInfo', companyController.getComInfoById)
router.post('/add-company', companyController.addCom)

export default router