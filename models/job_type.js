import mongoose from './db'
const Schema = mongoose.Schema

const jobTypeSchema = new Schema({
  typeId: Schema.Types.ObjectId,
  typeName: String,
  parentClassId: Schema.Types.ObjectId,
})

const jobTypeModel = mongoose.model('Job', jobTypeSchema)
export default jobTypeModel