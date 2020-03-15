require("babel-core/register")
require('./app.js')
// var http = require('http')
// var ws = require('ws')  // 加入引入ws模块的代码。
// var wsUtils = require('../utils/websocket');
// const host = '192.168.1.208'
// const port = 3000

// app.default.set('host', host)
// app.default.set('port', port)

// var server = http.createServer(app) // http服务器
// var wsServer = new ws.Server({ // 加入创建ws服务器的代码。
//   port: 80,
//   server: server
// })


// server.listen(port, () => {
//   console.log(`listen: ${port}`)
// })
// server.on('error', (err) =>{
//   console.log(`服务器错误： `, err)
// })
// server.on('listening', () => {
//   console.log(`服务已启动，地址：${host + ':' + port}`)
// })
// console.log('wsServer: ', wsServer)
// wsServer.on('connection', function (websocket) { // 加入这段代码，对连接之后的websocket连接进行配置。
//   console.log('on connected: ', websocket)
//   // websocket.on('error', onError); // 监听对应事件。
//   // websocket.on('open', onOpen);
//   // websocket.on('close', onClose);
//   // websocket.on('message', onMessage);
//   // wsUtils.init(websocket); // 这边的init函数稍后说明。
// });