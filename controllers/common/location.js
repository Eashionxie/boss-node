import config from '../../common/config'
import request from '../../common/request'
import formData from '../../common/resForm'

exports.coordinate2Address = (req, res) => {
  const urlStr = 'https://apis.map.qq.com/ws/geocoder/v1/'
  const params = {
    location: req.query.location, // 坐标，例：location=39.984154,116.307490
    get_poi: 0, // 是否返回周边POI列表：1返回，0不返回
    // poi_options: 1, // 控制POI列表，详见：https://lbs.qq.com/webservice_v1/guide-gcoder.html
    key: config.qqMapKey // 开发密钥
  }
  request({
    url: urlStr,
    method: 'get',
    params: params
  }).then(result => {
    if(result.status !== 0) return res.send(formData(null, result.status, result.message))
    res.send(formData(result.result))
  })
}