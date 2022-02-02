var mon = require('mongoose');

mon.connect(
    'mongodb://localhost:27017/lms',
    {useNewUrlParser: true, useUnifiedTopology: true},
    function(err){
        if(!err){
            console.log("DB started!!");
        }else{
            console.log("The error is: \n"+err);
        }
    }
)

function getDbConnection(){
    return mon;
}

module.exports.getDbConnection = getDbConnection;