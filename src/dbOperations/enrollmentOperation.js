const schema = require('../dbSchema/enrollmentSchema');
const db = require('./../dbConnection/dbCon');

var con = db.getDbConnection();
var enrollmentSchema = schema.getEnrollmentSchema();

var Enrollment = con.model('enrollment', enrollmentSchema);

function addEnrollment(req, res){
    var enrollment = new Enrollment();
    enrollment.email_id = req.body.email_id;
    enrollment.first_name = req.body.first_name;
    enrollment.last_name = req.body.last_name;
    enrollment.course_id = req.body.course_id;
    enrollment.enrollment_date = req.body.enrollment_date;
    enrollment.mark_percent = req.body.mark_percent;


    Enrollment.find({email_id:req.body.email_id.toLowerCase(), course_id:req.body.course_id})
        .then(function(data){

            console.log("Enrollment data length: "+data.length);

            if(data.length == 0){
                Enrollment.find().sort({id:-1}).limit(1)
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
            
                    enrollment.id = myMaxId + 1;
            
                    enrollment.save(function(err, cr){
                        if(err){
                            console.log("The error while adding course is: "+err)
                        }
                        console.log("Inserted: "+cr);
                    })
                });
                res.send("Enrollment completed");
            }else{
                res.send("Enrollment already exists");
            }
        });
}

function getEnrollmentInfoByUserId(req, res){
    var userId = req.params.userName;
    console.log("reached getEnrollmentInfoByUserId in service for "+userId);
    Enrollment.find({email_id:userId.toLowerCase()}, function(err, data){
        if(!err){
            if(data.length > 0){
                res.send(data);
            }
        }else{
            console.log("The error while getting enrollement is: "+err);
        }
    });
}


function updateEnrollment(req, res){
    console.log("Reached updateEnrollment");

    var emailId = req.body.email_id;
    var courseId = req.body.course_id;

    console.log(emailId);
    console.log(courseId);
    console.log(req.body.mark_percent);

    const filter = {email_id: emailId, course_id: courseId};
    const update = {mark_percent: req.body.mark_percent};

    Enrollment.updateOne(filter, update, function(err, raw){
        console.log(err);
        console.log(JSON.stringify(raw));
        res.send("Enrollment updated");
    })


}

function getEnrollmentForAdmin(req, res){
    Enrollment.find()
        .then(function(data){
            res.send(data);
        })
}

module.exports.addEnrollment = addEnrollment;
module.exports.getEnrollmentInfoByUserId = getEnrollmentInfoByUserId;
module.exports.updateEnrollment = updateEnrollment;
module.exports.getEnrollmentForAdmin = getEnrollmentForAdmin;

