const db = require('./../dbConnection/dbCon');
var con = db.getDbConnection();

var EnrollmentSchema = new con.Schema({
    id:Number,
    email_id:String,
    first_name:String,
    last_name:String,
    course_id:String,
    enrollment_date:Date,
    mark_percent:String,
},{
    timestamps:true
});

function getEnrollmentSchema(){
    return EnrollmentSchema;
}

module.exports.getEnrollmentSchema = getEnrollmentSchema;