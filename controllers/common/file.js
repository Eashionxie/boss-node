import fromData from '../../common/resForm'
import formidable from 'formidable'
import fs from 'fs'

exports.fileUpload = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files){
    const ext_name = files.file.name.split('.').pop()
    if(err) return res.send(fromData('', 500, err))
    const _dirs = fs.readdirSync(`public/uploadFiles`)
    const _date = Date.now()
    if (_dirs.indexOf(fields.openid) === -1) {
      fs.mkdirSync(`public/uploadFiles/${fields.openid}`)
      fs.writeFileSync(`public/uploadFiles/${fields.openid}/${_date}.${ext_name}`, fs.readFileSync(files.file.path))
    } else {
      fs.writeFileSync(`public/uploadFiles/${fields.openid}/${_date}.${ext_name}`, fs.readFileSync(files.file.path))
    }
    res.send(fromData(`/uploadFiles/${fields.openid}/${_date}.${ext_name}`))
  })
}