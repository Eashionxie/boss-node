import ws from 'ws'
import config from '../../common/config'
import formData from '../../common/resForm'
import wsUtils from './wsUtils'

const wsServer = new ws.Server({ port: config.socketPort })

wsServer.options.host = config.host

wsServer.on('connection', (wsRes) => {
  console.log('on connected')
  wsRes.on('error', (err) => { wsRes.send(formData(null, 500, err)) }) // 监听对应事件。
  wsRes.on('open', (...val) => { console.log('on open: ', ...val) })
  wsRes.on('close', () => { console.log('closed') })
  wsRes.on('message', (...val) => {
    console.log('message: ', ...val)
  })
  wsUtils.init(wsRes)
})