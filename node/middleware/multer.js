const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
  destination: 'image/',
  // destination: '../myapp/src/components/users/image',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  }
})
const upload = multer({ storage: storage })
module.exports = upload

// module.exports.send = (req, res) => {
//   upload.single('img');
//   res.send('ok');
// }