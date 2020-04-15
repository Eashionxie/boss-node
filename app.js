import express from 'express'
import bodyParse from 'body-parser'
import mongoose from 'mongoose'
import router from './routes/index'
import config from './common/config'

import './controllers/common/websocket'

const app = express()

const host = config.host
const port = config.port

app.set('host', host)
app.set('port', port)

mongoose.connect('mongodb://localhost/test')
mongoose.Promise = global.Promise

app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())


app.use(express.static('./public'))

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", 'Express');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next()
  }
})

router(app)

app.listen(port, () => {
  console.log(`服务已启动,地址：${host + ':' + port}`)
})