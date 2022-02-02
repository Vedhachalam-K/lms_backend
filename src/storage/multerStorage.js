const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

function getStorage(){
    var upload = multer({ storage: storage })
    return upload;
}

module.exports.getStorage = getStorage;