const fs = require('fs');
const upload = require('./../storage/multerStorage');
const fileUploadUtil = require('./../fileUpload/fileUploadUtil')


function fileUploadServices(app){
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
        //res.json({ message: 'WELCOME' });
    });


    app.post('/uploadFile',  upload.getStorage().single('myFile'), function(req, res) {
    
        var validationResult = '';
    
        var readStream = fs.createReadStream(req.file.path);
        console.log("File uploaded to: "+req.file.path);
        var data = '';
    
        readStream
            .on('data', function (chunk) {
                data += chunk;
            })
            .on('end', function () {
                //console.log(data);
                validationResult = fileUploadUtil.validateFile(data);
    
                console.log("Returned value = " + validationResult);
                fileUploadUtil.deleteFile(req.file.path);
    
                res.send(validationResult);
            });
    });

}

module.exports.fileUploadServices = fileUploadServices;