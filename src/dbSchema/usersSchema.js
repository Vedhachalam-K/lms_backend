const db = require('./../dbConnection/dbCon');

var con = db.getDbConnection();

var UserSchema = new con.Schema({
    id:Number,
    email_id:String,
    pwd:String,
    role:String,
    first_name:String,
    last_name:String,
    dob:Date
}, {
    timestamps:true
})

function getUserSchema(){
    return UserSchema;
}

module.exports.getUserSchema = getUserSchema;