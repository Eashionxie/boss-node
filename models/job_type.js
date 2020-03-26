import mongoose from './db'
const Schema = mongoose.Schema

let childSchema = new Schema({
  childTypeName: String,
  parentId: Schema.Types.ObjectId
})

const jobTypeSchema = new Schema({
  typeName: String,
  childTypes: [childSchema]
})

const jobTypeModel = mongoose.model('JobType', jobTypeSchema)
export default jobTypeModel