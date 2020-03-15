let wsServer = null

function init (ws) {
  wsServer = ws
}
function send (message) {
  if (!wsServer) return
  wsServer.send(message)
}

module.exports = { send, init }