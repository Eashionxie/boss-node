import mongoose from './db'
const Schema = mongoose.Schema

const welfareSchema = new Schema({
  label: String,
  value: Number,
  status: Number // 状态：1启用，0未启用
})

const welfareModel = mongoose.model('Welfare', welfareSchema)
export default welfareModel