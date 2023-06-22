let fs = require('fs');
let p = require('path')


exports.getIma = ('/image',(req, res, next) => {

  try {
    let { path } = req.query;
    if (fs.existsSync(p.join(process.cwd(), path))) {
      res.status(200).sendFile(
        p.join(process.cwd(), path)
      );
    }
  }
  catch (error) {
    res.status(404).json({
      message: 'File not found'
    });
  }
})