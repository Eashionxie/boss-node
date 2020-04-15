import mongoose from './db'
const Schema = mongoose.Schema

const authCodeSchema = new Schema({
  phoneNumber: { type: Number, required: true },
  code: { type: Number, required: true },
  createTime: { type: Date, default: Date.now, index: { expireAfterSeconds: 300 } }
})

const authCodeModel = mongoose.model('AuthCode', authCodeSchema)
export default authCodeModel