import UserModel from '../../models/user'
import config from '../../common/config'
import request from '../../common/request'
import formData from '../../common/resForm'

exports.getUserOpenid = (req, res) => {
  const urlStr = 'https://api.weixin.qq.com/sns/jscode2session'
  const params = {
    appid: config.appid,
    secret: config.secret,
    js_code: req.query.code,
    grant_type: 'authorization_code'
  }
  request({
    url: urlStr,
    method: 'get',
    params: params
  }).then(result => {
    if(result.errcode) return res.send(formData(null, result.errcode, result.errmsg))
    UserModel.find({ openId: result.openid }, (err, data) => {
      if (err) return res.send(formData(null, 500, err))
      !data.length && res.send(formData({ userData: '', openId: result.openid }))
      data.length && res.send(formData(data[0]))
    })
  })
}

exports.getUserInfo = (req, res) => {
  
}

exports.postUserInfo = (req, res) => {
  UserModel.find({ openId: req.body.openId }, (err, docs) =>{
    if(err) return res.send(formData(null, 500, err))
    if (docs && docs.length) {
      UserModel.findOneAndUpdate({ openId: docs[0].openId }, req.body, (err, data) => {
        if (err) return res.send(formData(null, 500, err))
        res.send(formData(data, 200, '更新成功'))
      })
    } else {
      const user = new UserModel(req.body)
      user.save(function (err, data) {
        if(err) return res.send(formData(null, 500, err))
        res.send(formData(data))
      })
    }
  })
}