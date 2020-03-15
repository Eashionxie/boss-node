import express from 'express'
import companyController from '../controllers/job/job'

const router = express.Router()

router.get('/get-job-list', companyController.getJobList)
router.get('/get-jobInfo', companyController.getJobInfoById)
router.post('/add-job', companyController.addJob)

export default router