import CompanyModel from '../../models/company'
import welfareModel from '../../models/welfare'
import UserModel from '../../models/user'
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
  CompanyModel.findOne({ _id: req.query._id }, (err, data) => {
    if (err) return res.send(formData(null, 500, err))
    res.send(formData(data))
  })
}

exports.addCom = (req, res) => {
  const _token = req.get('token')
  if (!_token) return res.send(formData(null, 500, '暂无权限'))
  if (req.body._id) {
    CompanyModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, data) => {
      if (err) return res.send(formData(null, 500, err))
      res.send(formData(data, 200, '更新成功'))
    })
  } else {
    UserModel.findOne({ openId: _token }, (e, u) => {
      if(e) return res.send(formData(null, 500, e))
      if(u.companyId && u.companyId != '') return res.send(formData(null, 500, '用户已绑定公司'))
      const company = new CompanyModel(req.body)
      company.save(function (err, data) {
        if(err) return res.send(formData(null, 500, err))
        UserModel.findOneAndUpdate({ openId: _token }, { companyId: data._id }, (err, user) => {
          if (err) return res.send(formData(null, 500, '数据库错误'))
          res.send(formData(data))
        })
      })
    })
  }
}

exports.addComAlbum = (req, res) => {
  CompanyModel.findOneAndUpdate({ _id: req.body._id }, {
    '$push': { companyAlbum: { url: req.body.url } }
  }, { new: true }, (err, data) => {
    if(err) return res.send(formData(null, 500, err))
    res.send(formData(data))
  })
}

exports.deleteComAlbum = (req, res) => {
  CompanyModel.findOneAndUpdate({ _id: req.body.comId }, {
    $pull: { companyAlbum: { _id: req.body._id } }
  }, { new: true }, (err, data) => {
    if(err) return res.send(formData(null, 500, err))
    res.send(formData(data))
  })
}

exports.updateWelfares = (req, res) => {
  if (req.query._id) {
    welfareModel.findOneAndUpdate({ _id: req.query._id }, req.body, { new: true }, (err, data) => {
      if(err) return res.send(formData(null, 500, err))
      res.send(data)
    })
  } else {
    const welfare = new welfareModel(req.query)
    welfare.save((err, data) => {
      if(err) return res.send(formData(null, 500, err))
      res.send(formData(data))
    })
  }
}

exports.getWelfares = (req, res) => {
  welfareModel.find({}, (err, docs) => {
    if (err) return res.send(formData(null, 500, err))
    res.send(formData(docs))
  })
}