
const response = (status_code, status_message, res, data) => {
  return res.status(status_code).json({
    status_code: status_code,
    message: status_message,
    datas: data,
    time: new Date().toISOString()
  })
}
module.exports = response