import express from 'express'
import jobController from '../controllers/job/job'

const router = express.Router()

router.get('/get-job-list', jobController.getJobList)
router.get('/get-jobInfo', jobController.getJobInfoById)
router.post('/add-job', jobController.addJob)
router.post('/add-job-type', jobController.addJobType)
router.get('/get-job-types', jobController.getJobTypes)

export default router