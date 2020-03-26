import mongoose from './db'
const Schema = mongoose.Schema

const historySearchSchema = new Schema({
  openId: String,
  historyList: [
    {
      jobType: String,
      creatTime: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

const historySearchModel = mongoose.model('Search', historySearchSchema)

export default historySearchModel