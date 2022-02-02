const express = require('express')
const bodyParser= require('body-parser')
const app = express();
const api = require('./src/services/fileUploadServices');
const userAPI = require('./src/services/userService');
const courseAPI = require('./src/services/courseService');
const enrollmentAPI = require('./src/services/enrollmentService');

app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
app.use(express.text());

api.fileUploadServices(app);
userAPI.userServices(app);
courseAPI.courseServices(app);
enrollmentAPI.enrollmentServices(app);

app.listen(8080, function(){
    console.log('Server started on port 8080')
});
