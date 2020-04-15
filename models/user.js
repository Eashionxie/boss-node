import mongoose from './db'
const Schema = mongoose.Schema

const userSchema = new Schema({
  openId: {
    type: String,
    required: true
  },
  nickName: String, // 用户微信昵称
  userName: String, // 用户姓名,
  userPassword: String,
  userType: {
    type: Number,
    validate: {
      validator: v => {
        return v === 1 || v === 2
      },
      message: '未知的用户类型'
    },
  }, // 用户类型：1 大神；2 老板
  userJob: String, // 用户职位
  userPostStatus: { // 用户在职状态   0 离职-随时到岗；1 在职-暂不考虑；2 在职-月内到岗
    type: String,
    enum: ['0', '1', '2']
  },
  userResumeStatus: { // 用户简历状态   0 隐藏；1 公开
    type: String,
    enum: ['0', '1']
  },
  userStatus: {
    type: String,
    enum: ['0', '1'], // 0:异常；1:正常
    default: '1'
  },
  avatarUrl: {  // 头像
    type: String,
    default: ''
  },
  address: String,
  city: String,
  province: String,
  country: String,
  language: String,
  email: String,
  gender: Number, // 性别：0 女；1 男
  age: Number,
  tel: Number,
  birthday: Number,
  workDate: Number,
  companyId: String,
  workExp: {
    type: String,
    enum: ['经验不限', '1-3年', '3-5年'],
  },
  eduLeve: {
    type: String,
    enum: ['学历不限', '初中', '中专/中技', '大专', '本科', '硕士']
  },
  discribe: String,
  userWebSite: [
    {
      webAddress: String,
      createTime: { type: Date, default: Date.now }
    }
  ],
  attachmentResumes: [ // 附件简历
    {
      name: String,
      filePath: String,
      fileType: String,
      previewImage: String,
      size: Number,
      status: { type: Number, default: 1 },
      uploadDate: Number
    }
  ],
  jobofLooking: [
    {
      jobType: String,
      jobTypeId: Schema.Types.ObjectId,
      industry: {
        type: Schema.Types.ObjectId
      },
      city: String,
      minSalary: Number,
      maxSalary:Number
    }
  ],
  onlinResumeId: { type: Number },
  passedJobs: [],
  waitInterviewJob: [],
  collectedJobs: [],
  viewedHistory: [],
  createTime: {
    type: Date,
    default: Date.now
  }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel