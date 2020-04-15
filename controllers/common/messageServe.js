import Core from '@alicloud/pop-core'
import bcryptjs from 'bcryptjs'
import md5 from 'md5-node'
import config from '../../common/config'
import formData from '../../common/resForm'
import authCodeModel from '../../models/authCode'
import userModel from '../../models/user'

const client = new Core({
  accessKeyId: config.AK,
  accessKeySecret: config.Aks,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

let params = {
  "SignName": config.SignName,
  "TemplateCode": config.TemplateCode,
  "PhoneNumbers": "",
  "TemplateParam": JSON.stringify({ code: Math.ceil(Math.random() * 1000000) })
}

let requestOption = {
  method: 'POST'
}

exports.sendAliMessage = (req, res) => {
  if (!(/^1[3456789]\d{9}$/.test(req.query.phoneNumber))) return res.send(formData(null, 500, '请输入正确的手机号码'))
  params.PhoneNumbers = req.query.phoneNumber
  authCodeModel.findOne({ phoneNumber: req.query.phoneNumber }, (err, data) => {
    if (err) return res.send(formData(null, 500, '数据库查询错误'))
    client.request('SendSms', params, requestOption).then((result) => {
      if (data) {
        authCodeModel.updateOne({ code: data.code }, { code: JSON.parse(params.TemplateParam).code }, (err, updateRes) => {
          if (err) return res.send(formData(null, 500, err))
          res.send(formData({ phoneNumber: req.query.phoneNumber }))
        })
      } else {
        let _newAuth = new authCodeModel({ phoneNumber: req.query.phoneNumber, code: JSON.parse(params.TemplateParam).code })
        _newAuth.save((err, dataAF) => {
          if (err) return res.send(formData(null, 500, err))
          res.send(formData({ phoneNumber: req.query.phoneNumber }))
        })
      }
    }, (err) => {
      res.send(formData(null, 500, err))
    })
  })
}

exports.userSignUp = (req, res) => {
  authCodeModel.find({ phoneNumber: req.body.phoneNumber }, (err, docs) => {
    if (err) return res.send(formData(null, 500, '数据库查询错误'))
    if (!docs || !docs.length) return res.send(formData(null, 500, '验证码已过期，请重新发送'))
    if (Number(docs[0].code) !== Number(req.body.code)) return res.send(formData(null, 500, '验证码错误'))
    if (!req.body.userPassword) return res.send(formData(null, 500, '请输入密码'))
    userModel.find({ openId: md5(req.body.phoneNumber) }, (err, docs) => {
      if (err) return res.send(formData(null, 500, '数据库错误'))
      if (docs && docs.length) return res.send(formData(null, 500, '该用户已注册'))
      const salt = bcryptjs.genSaltSync(10)
      let hash = bcryptjs.hashSync(req.body.userPassword, salt)
      let _userData = {
        openId: md5(req.body.phoneNumber),
        userPassword: hash,
        userType: 2,
        tel: req.body.phoneNumber
      }
      let _user = new userModel(_userData)
      _user.save((err, data) => {
        if (err) return res.send(formData(null, 500, '数据保存错误'))
        let _data = JSON.parse(JSON.stringify(data))
        delete _data.userPassword
        res.send(formData(_data))
      })
    })
  })
}

exports.userLogin = (req, res) => {
  userModel.findOne({ openId: md5(req.body.phoneNumber) }, (err, data) => {
    if (err) return res.send(formData(null, 500, '数据库查询错误'))
    if (!data) return res.send(formData('用户未注册', 500, '用户未注册'))
    if (req.body.userPassword) {
      const pwdMatchFlag = bcryptjs.compareSync(req.body.userPassword, data.userPassword)
      if (pwdMatchFlag) {
        let _data = JSON.parse(JSON.stringify(data))
        delete _data.userPassword
        res.send(formData(_data))
      } else {
        res.send(formData(null, 500, '用户名或密码错误'))
      }
    }
    if (req.body.code) {
      authCodeModel.find({ phoneNumber: req.body.phoneNumber }, (err2, docs) => {
        if (err2) return res.send(formData(null, 500, '数据库查询错误'))
        if (!docs || !docs.length) return res.send(formData(null, 500, '验证码已过期，请重新发送'))
        if (Number(docs[0].code) !== Number(req.body.code)) return res.send(formData(null, 500, '验证码错误'))
        let _data = JSON.parse(JSON.stringify(data))
        delete _data.userPassword
        res.send(formData(_data))
      })
    }
  })
}