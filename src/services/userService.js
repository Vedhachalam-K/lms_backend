var userOperations = require('./../dbOperations/userOperation')

function userServices(app){
    app.get('/getUsers', function(req, res){
        var userString = userOperations.getUsers(res);
    });

    app.get('/getUser/:userName*?', function(req, res){
        userOperations.getUser(req, res);
    });

    app.post('/addUser', function(req, res){
        userOperations.addUser(req, res);
    });

    app.get('/getUsersForAdmin',function(req, res){
        userOperations.getUsersForAdmin(req, res);
    })
}

module.exports.userServices = userServices;