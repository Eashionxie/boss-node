import mongoose from './db'
const Schema = mongoose.Schema

const resumeSchema = new Schema({
  resumeId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  advantage: String,
  intentionJobs: [
    {
      jobId: Schema.Types.ObjectId,
      tradeId: Schema.Types.ObjectId,
      tradeName: String,
      city: String,
      minSalary: Number,
      maxSalary: Number
    }
  ],
  workExps: [
    {
      companyName: String,
      department: String,
      position: String,
      beginDate: Date,
      endDate: Date,
      discribe: String,
      tradeId: Schema.Types.ObjectId,
      tradeName: String,
      skills: [],
      results: String
    }
  ],
  projects: [
    {
      projectName: String,
      projectLink: String,
      role: String,
      describe: String,
      result: String,
      beginDate: Date,
      endDate: Date
    }
  ],
  eduExps: [
    {
      schoolName: String,
      level: {
        type: String,
        enum: ['初中及以下', '中专/中技', '大专', '本科', '硕士', '博士']
      },
      major: String,
      beginDate: Date,
      endDate: Date,
      extraExp: String
    }
  ],
  socialPage: String,
  creatTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  updatePerson: String
})

const resumeModel = mongoose.model('Job', resumeSchema)
export default resumeModel