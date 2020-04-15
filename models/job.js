import mongoose from './db'
const Schema = mongoose.Schema

const jobSchema = new Schema({
  companyInfo: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  // jobTypeInfo: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'JobType'
  // },
  jobTypeId: String,
  jobName: String,
  city: String,
  minSalary: Number,
  maxSalary:Number,
  salaryType: String,
  workExp: {
    type: String,
    enum: ['经验不限', '1-3年', '3-5年'],
  },
  eduLeve: {
    type: String,
    enum: ['学历不限', '初中', '中专/中技', '大专', '本科', '硕士']
  },
  // publisherInfo: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  publisherId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  detail: String,
  tags: [],
  exactAddress: {
    name: String,
    lat: String,
    lng: String
  },
  jobStatus: {
    type: String,
    enum: ['0', '1'], // 0:停止招聘； 1:在招
    required: true
  },
  creatTime: {
    type: Date,
    default: Date.now
  }
})

const JobModel = mongoose.model('Job', jobSchema)
export default JobModel