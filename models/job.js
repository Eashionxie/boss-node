import mongoose from './db'
const Schema = mongoose.Schema

const jobSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  jobTypeId: Schema.Types.ObjectId,
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
  creatTime: {
    type: Date,
    default: Date.now
  }
})

const JobModel = mongoose.model('Job', jobSchema)
export default JobModel