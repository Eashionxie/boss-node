import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, function (err) {
  if (err) return console.log(err)
  console.log('数据库连接成功！')
})

module.exports = mongoose