import express from 'express'
import deliveryController from '../controllers/delivery'

const router = express.Router()

router.get('/get-delivery-list', deliveryController.deliveryList)
router.get('/get-delivery-id', deliveryController.viewDelivery)
router.post('/post-delivery', deliveryController.deliveryResume)
router.get('/change-delivery-status', deliveryController.deliveryStatus)

export default router