var courseOperations = require('./../dbOperations/courseOperation');
const storage = require('./../storage/multerStorage');

function courseServices(app){

    app.post('/addCourse', storage.getStorage().array("uploads", 2), function(req, res){
        courseOperations.addCourse(req, res);
    });

    app.get('/getCoursesForAdmin', function(req, res){
        courseOperations.getCoursesForAdmin(req, res); 
    })

    app.get('/getCourseById/:courseId*?', function(req, res){
        courseOperations.getCourseById(req, res);
    })
}

module.exports.courseServices = courseServices;