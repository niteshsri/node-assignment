const semesterClassController = require('../controllers').semesterclass;
const studentController = require('../controllers').student;
const professorController = require('../controllers').professor;

module.exports = (app) => {
  // app.get('/api', (req, res) => res.status(200).send({
  //   message: 'Welcome to the Student Teacher Platform API!',
  // }));

    app.post('/api/classes', semesterClassController.create);
    app.get('/api/classes', semesterClassController.list);
    app.get('/api/classes/:id', semesterClassController.retrieve);
    app.post('/api/classes/:id/professor', semesterClassController.addProfessorToClass);
    app.get('/api/students/:id/classes', semesterClassController.getClassStudents);
    

    app.post('/api/professors', professorController.create);
    app.get('/api/professors', professorController.list);
    app.get('/api/professors/:id', professorController.retrieve);



    app.post('/api/students', studentController.create);
    app.get('/api/students', studentController.list);
    app.get('/api/students/:id', studentController.retrieve);
    app.delete('/api/students/:id', studentController.destroy);
    app.patch('/api/students/:id', studentController.partialUpdate);
    app.post('/api/classes/:id/students', studentController.addStudentToClass);
    
};