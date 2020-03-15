import JobModel from '../../models/job'
import '../../models/company'
import '../../models/user'
import formData from '../../common/resForm'

exports.getJobList = (req, res) => {
  console.log('req.body: ', req.query)
  const {current = 1, size = 10, keyWords = '', jobTypeId = ''} = req.query
  JobModel.countDocuments({
    $or: [
      { jobName: {'$regex': keyWords, $options: '$i'} }
    ]
  }, (errCount, count) => {
    if (errCount) return res.send(formData(null, 500, err))
    console.log('keyWords: ', keyWords)
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
  console.log(req.query.jobId)
  if (!req.query.jobId) return res.send(formData(null, 500, '查询参数不能为空'))
  JobModel.findOne({ _id: req.query.jobId })
  .populate('companyId')
  .populate('publisherId')
  .exec((err, data) => {
    console.log(data)
    if (err) return res.send(formData(null, 500, err))
    res.send(formData(data))
  })
}

exports.addJob = (req, res) => {
  if (req.body.jobId) {
    JobModel.findOneAndUpdate({ _id: req.body.jobId }, req.body, (err, data) => {
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