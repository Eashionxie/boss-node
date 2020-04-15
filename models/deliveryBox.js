import mongoose from './db'
const Schema = mongoose.Schema

const deliverySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  jobType: {
    type: Schema.Types.ObjectId,
    ref: 'JobType',
    required: true
  },
  resumeType: {
    type: String,
    enum: ['0', '1'], // 0: 在线简历； 1：附件简历
    required: true
  },
  deliveryType: {
    type: String,
    enum: ['0', '1', '2', '3'], // 0:已投未读，1:已投已读，2:匹配，3:不匹配
    required: true
  },
  creatTime: {
    type: Number,
    required: true
  }
})

const DeliveryModel = mongoose.model('delivery', deliverySchema)

export default DeliveryModel