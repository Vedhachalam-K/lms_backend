const schema = require('../dbSchema/usersSchema');
const db = require('./../dbConnection/dbCon')

var con = db.getDbConnection();
var userSchema = schema.getUserSchema();

var User = con.model('user', userSchema);

function getUsers(res){
    console.log("reached getUsers");

    User.find()
        .then(function(data){
            var resultString = "";
            for(var i=0;i<data.length;i++){
                console.log(data[i].id + " -- " + data[i].email_id + " -- " + data[i].pwd + " -- " + data[i].role + " -- " + data[i].first_name + " -- " + data[i].last_name);
                resultString += data[i].id + " -- " + data[i].email_id + " -- " + data[i].pwd + " -- " + data[i].role + " -- " + data[i].first_name + " -- " + data[i].last_name + "\n";
            }
            res.send(resultString);
        });
}

function getUser(req, res){
    console.log("reached getUser");
    var userId = req.params.userName;
    User.find({email_id: userId.toLowerCase()}, function(err, data){
        if(!err){
            if(data.length > 0){
                res.json(data[0]);
            }else{
                data[0] = new User();
                res.json(data[0]);
            }
        }else if(err){
            console.log("The error is: "+err)
        }
    });
}

function addUser(req, res){
    var email_id = req.body.email_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var dob = req.body.dob;
    var pwd = req.body.pwd;

    console.log(req.body);

    console.log("Input received: "+email_id + " -- " + first_name + " -- " + last_name + " -- " + dob);

    User.find({email_id: email_id.toLowerCase()}, function(err, data){
        if(!err){
            if(data.length > 0){
                res.send("User ID '"+ email_id +"' already exists. Please try a different User ID" );
            }else{
                User.find().sort({id:-1}).limit(1)
                    .then(function(data){
                        console.log(data);
                        console.log("Max id = " + data[0].id);
                        myMaxId = data[0].id;
                    })
                    .then(function(){
                        var b = new User();
                        b.id = myMaxId+1;
                        b.email_id = email_id.toLowerCase();
                        b.first_name = first_name;
                        b.last_name = last_name;
                        b.dob = dob;
                        b.pwd = pwd;
                        b.role = "user";

                        b.save(function(err, usr){
                            if(err){
                                console.log("The error is : "+err)
                            }
                            console.log("Inserted: "+usr);
                        })
                    });

                res.send("Registration successful for '"+ email_id +"'");
            }
        }else if(err){
            console.log("The error is: "+err)
        }
    });

    
}

function getUsersForAdmin(req, res){
    User.find({ email_id: { $ne: 'admin@lms.com' } })
        .then(function(data){
            res.send(data);
        })
}

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.getUsersForAdmin = getUsersForAdmin;