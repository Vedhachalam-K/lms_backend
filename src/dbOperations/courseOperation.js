const schema = require('../dbSchema/coursesSchema');
const db = require('./../dbConnection/dbCon');
const fs = require('fs');
const fileUploadUtil = require('./../fileUpload/fileUploadUtil')

var con = db.getDbConnection();
var courseSchema = schema.getCourseSchema();

var Course = con.model('course', courseSchema);

function addCourse(req, res){

    var files = req.files;

    var courseContent = fs.readFileSync(files[0].path, 'utf8');
    var questionContent = fs.readFileSync(files[1].path, 'utf8');

    //console.log("Question Content: "+questionContent);

    var validationResult = fileUploadUtil.validateFile(questionContent);
    
    if(validationResult == "File uploaded successfully"){
        var validSplit = fileUploadUtil.getValidSplit(questionContent.split('\n'));

        //console.log("validSplit = "+validSplit);

        var course = new Course();
        course.course_id = req.body.course_id;
        course.course_name = req.body.course_name;
        course.max_mark = req.body.max_mark;
        course.courseFileContent = courseContent;

        var objArr = new Array();

        for(var i=0;i<validSplit.length;i=i+6){
            var j = i;

            let ques = {
                question:validSplit[j],
                option1:validSplit[j+1],
                option2:validSplit[j+2],
                option3:validSplit[j+3],
                option4:validSplit[j+4],
                rightOption:validSplit[j+5],
                default:'',
            }
            objArr.push(ques);
                
            
            // console.log("-------------------------------------------");
            // console.log("Quesiton: "+validSplit[0]);
            // console.log("Option1: "+validSplit[1]);
            // console.log("Option2: "+validSplit[2]);
            // console.log("Option3: "+validSplit[3]);
            // console.log("Option4: "+validSplit[4]);
            // console.log("Default value: "+'');
            // console.log("Valid Answer: "+validSplit[5]);
                
        }

        course.questions = objArr;

        console.log("The final course object is: "+course);

        Course.find().sort({id:-1}).limit(1)
        .then(function(data){
            console.log(data);
            if(data.length == 0){
                myMaxId = 0;
            }else{
                console.log("Max id = " + data[0].id);
                myMaxId = data[0].id;
            }
        })
        .then(function(){

            course.id = myMaxId + 1;

            course.save(function(err, cr){
                if(err){
                    console.log("The error while adding course is: "+err)
                }
                console.log("Inserted: "+cr);
            })
        });


        res.send("Course created successfully");
    }else{
        res.send("Questions File is NOT valid");
    }


    fileUploadUtil.deleteFile(files[0].path);
    fileUploadUtil.deleteFile(files[1].path);
}

function getCoursesForAdmin(req, res){
    Course.find()
        .then(function(data){
            res.send(data);
        });
}

function getCourseById(req, res){
    console.log("The requested id: "+req.params.courseId);

    Course.find({course_id:req.params.courseId})
        .then(function(data){
            res.send(data);
        });
}

module.exports.addCourse = addCourse;
module.exports.getCoursesForAdmin = getCoursesForAdmin;
module.exports.getCourseById = getCourseById;