var enrollmentOperation = require('./../dbOperations/enrollmentOperation');

function enrollmentServices(app){
    app.post('/addEnrollment', function(req, res){
        enrollmentOperation.addEnrollment(req, res);
    });

    app.get('/getEnrollmentByUser/:userName*?', function(req, res){
        enrollmentOperation.getEnrollmentInfoByUserId(req, res);
    });

    app.post('/updateEnrollment', function(req, res){
        enrollmentOperation.updateEnrollment(req, res);
    });

    app.get('/getEnrollmentsForAdmin', function(req, res){
        enrollmentOperation.getEnrollmentForAdmin(req, res);
    })
}

module.exports.enrollmentServices = enrollmentServices;