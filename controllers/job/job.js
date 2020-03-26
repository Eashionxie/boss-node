import JobModel from '../../models/job'
import JobTypeModel from '../../models/job_type'
import '../../models/company'
import '../../models/user'
import formData from '../../common/resForm'
import jobTypeModel from '../../models/job_type'

exports.getJobList = (req, res) => {
  const {current = 1, size = 10, keyWords = '', jobTypeId = ''} = req.query
  JobModel.countDocuments({
    $or: [
      { jobName: {'$regex': keyWords, $options: '$i'} }
    ]
  }, (errCount, count) => {
    if (errCount) return res.send(formData(null, 500, err))
    JobModel.find({
      $or: [
        { jobName: {'$regex': keyWords, $options: '$i'} }
      ]
    })
    .skip(Number((current - 1) * size))
    .limit(Number(size))
    .sort({ 'creatTime': -1 })
    .populate('companyId')
    .populate('publisherId')
    .exec((err, docs) => {
      if (err) return res.send(formData(null, 500, err))
      let sendData = { records: docs, current: current, total: count, size: 10 }
      res.send(formData(sendData))
    })
  })
}

exports.getJobInfoById = (req, res) => {
  if (!req.query.jobId) return res.send(formData(null, 500, '查询参数不能为空'))
  JobModel.findOne({ _id: req.query.jobId })
  .populate('companyId')
  .populate('publisherId')
  .exec((err, data) => {
    if (err) return res.send(formData(null, 500, err))
    res.send(formData(data))
  })
}

exports.addJob = (req, res) => {
  if (req.body.jobId) {
    JobModel.findOneAndUpdate({ _id: req.body.jobId }, req.body, { new: true }, (err, data) => {
      if (err) return res.send(formData(null, 500, err))
      res.send(formData(data, 200, '更新成功'))
    })
  } else {
    const job = new JobModel(req.body)
    job.save(function (err, data) {
      if(err) return res.send(formData(null, 500, err))
      res.send(formData(data))
    })
  }
}

exports.getJobTypes = (req, res) => {
  jobTypeModel.find({}, (err, docs) => {
    if (err) return res.send(formData(null, 500, err))
    res.send(formData(docs))
  })
}

exports.addJobType = (req, res) => {
  if (req.body.jobTypeId) {
    JobTypeModel.findOne({ _id: req.body.jobTypeId }, (err, data) => {
      if (err) return res.send(formData(null, 500, err))
      let dataCopy = JSON.parse(JSON.stringify(data))
      req.body.typeName && (dataCopy.typeName = req.body.typeName)
      if (req.body.childTypeName) {
        let updateData = dataCopy.childTypes.filter(v => {
          return v._id === req.body.childTypeId
        })
        if (updateData.length) {
          dataCopy.childTypes.forEach(v => { v._id === req.body.childTypeId && (v.childTypeName = req.body.childTypeName) })
        } else {
          dataCopy.childTypes.push({ childTypeName: req.body.childTypeName })
        }
      }
      jobTypeModel.updateOne({ _id: dataCopy._id }, dataCopy, { new: true }, (err, result) => {
        if (err) return res.send(formData(null, 500, err))
        res.send(formData(dataCopy, 200, '更新成功'))
      })
    })
  } else {
    const jobType = new JobTypeModel(req.body)
    jobType.save(function (err, data) {
      if(err) return res.send(formData(null, 500, err))
      res.send(formData(data))
    })
  }
}