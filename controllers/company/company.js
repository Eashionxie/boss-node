import CompanyModel from '../../models/company'
import config from '../../common/config'
import request from '../../common/request'
import formData from '../../common/resForm'

exports.getComList = (req, res) => {
  CompanyModel.find({}, (err, docs) => {
    if (err) return res.send(formData(null, 500, err))
    res.send(formData(docs))
  })
}

exports.getComInfoById = (req, res) => {
  CompanyModel.findOne({ _id: req.body._id }, (err, data) => {
    if (err) return res.send(formData(null, 500, err))
    res.send(formData(data))
  })
}

exports.addCom = (req, res) => {
  if (req.body._id) {
    CompanyModel.findOneAndUpdate({ _id: req.body._id }, req.body, (err, data) => {
      if (err) return res.send(formData(null, 500, err))
      res.send(formData(data, 200, '更新成功'))
    })
  } else {
    const company = new CompanyModel(req.body)
    company.save(function (err, data) {
      if(err) return res.send(formData(null, 500, err))
      res.send(formData(data))
    })
  }
}