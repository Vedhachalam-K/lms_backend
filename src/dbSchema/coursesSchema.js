const db = require('./../dbConnection/dbCon');
var con = db.getDbConnection();

var CourseSchema = new con.Schema({
    id:Number,
    course_id:String,
    course_name:String,
    max_mark:Number,
    courseFileContent:String,
    questions:[
        {
            question:String,
            option1:String,
            option2:String,
            option3:String,
            option4:String,
            default:String,
            rightOption:String
        }
    ]
}, {
    timestamps:true
});

function getCourseSchema(){
    return CourseSchema;
}

module.exports.getCourseSchema = getCourseSchema;










