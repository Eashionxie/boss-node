module.exports = function formData (data, status = 200, message) {
  return {
    status: status,
    data: data,
    message: message || 'OK',
    timestamp: Date.now()
  }
}