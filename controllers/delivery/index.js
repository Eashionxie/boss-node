import DeliveryModel from '../../models/deliveryBox'
import formData from '../../common/resForm'
import '../../models/user'
import '../../models/job'
import '../../models/company'
import UserModel from '../../models/user'

exports.deliveryResume = (req, res) => {
  req.body.deliveryType = '0'
  console.log(req.get('token'))
  if (!req.get('token')) return res.send(formData(null, 500, '暂无权限'))
  DeliveryModel.find({
    user: req.body.userId,
    job: req.body.jobId,
    company: req.body.companyId
  }, (err, docs) => {
    if (err) return res.send(formData(null, 500, err))
    if (docs && docs.length) {
      let _bet = req.body.creatTime - docs[0].creatTime
      if (_bet < 1000 *60 * 60 * 24 *30) return res.send(formData(null, 500, '一个月内已申请过该职位'))
      DeliveryModel.findOneAndUpdate({ _id: docs[0]._id }, req.body, { new: true }, (err2, data) => {
        if (err2) return res.send(formData(null, 500, err2))
        res.send(formData(data))
      })
    } else {
      let _delivery = new DeliveryModel(req.body)
      _delivery.save((err3, record) => {
        if (err3) return res.send(formData(null, 500, err3))
        res.send(formData(record))
      })
    }
  })
}

exports.deliveryList = (req, res) => {
  if (!req.get('token')) return res.send(formData(null, 500, '暂无权限'))
  const {current = 1, size = 10, keyWords = '', jobType = '', startTime = '', endTime = ''} = req.query
  UserModel.findOne({ openId: req.get('token') }, (e, u) => {
    if (e) return res.send(formData(null, 500, e))
    if (!u.companyId) return res.send(formData(null, 500, '请先创建或者加入一个公司'))
    let _query = { company: u.companyId }
    if (jobType && !startTime) _query = { company: u.companyId, jobType }
    if (!jobType && startTime) _query = {
      company: u.companyId,
      creatTime: { $gte: startTime, $lte: endTime }
    }
    if (jobType && startTime) _query = {
      company: u.companyId,
      jobType,
      creatTime: { $gte: startTime, $lte: endTime }
    }
    DeliveryModel.countDocuments(_query, (errCount, count) => {
      if (errCount) return res.send(formData(null, 500, errCount))
      DeliveryModel.find(_query)
      .skip(Number((current - 1) * size))
      .limit(Number(size))
      .sort({ 'creatTime': -1 })
      .populate({ path: 'user', select: 'nickName avatarUrl gender age workExp eduLeve' })
      .populate({ path: 'company', select: 'companyName' })
      .populate('job')
      .exec((err, docs) => {
        if (err) return res.send(formData(null, 500, err))
        let sendData = { records: docs, current: current, total: count, size: 10 }
        res.send(formData(sendData))
      })
    })
  })
}

exports.viewDelivery = (req, res) => {
  if (!req.get('token')) return res.send(formData(null, 500, '暂无权限'))
  DeliveryModel.findOne({ _id: req.query._id })
  .populate({ path: 'user', select: 'nickName avatarUrl gender age workExp eduLeve' })
  .populate({ path: 'company', select: 'companyName' })
  .populate('job')
  .exec((err, data) => {
    if (err) return res.send(formData(null, 500, err))
    userModel.find({ openId: req.get('token') }, (e, users) => {
      if (err) return res.send(formData(null, 500, e))
      if (users[0].companyId !== data.company.companyId) return res.send(formData(null, 500, '暂无权限'))
      if (data.deliveryType === '0') {
        DeliveryModel.findOneAndUpdate({ _id: data._id }, { deliveryType: '1' }, { new: true }, (err2, record) => {
          if (err2) return res.send(formData(null, 500, err2))
          res.send(formData(record))
        })
      } else {
        res.send(formData(data))
      }
    })
  })
}

exports.deliveryStatus = (req, res) => {
  if (!req.get('token')) return res.send(formData(null, 500, '暂无权限'))
  DeliveryModel.findOneAndUpdate({ _id: req.query._id }, { deliveryType: req.query.status }, { new: true }, (err, data) => {
    if (err) return res.send(formData(null, 500, err))
    res.send(formData(data))
  })
}