const SemesterClass = require('../models').SemesterClass;
const Professor = require('../models').Professor;
const Student = require('../models').Student;

module.exports = {
  // Post /classses

  //create semester class
  create(req, res) {
    SemesterClass.findOrCreate(
        {where:{title:req.body.title}
        , defaults: {
          
        }
    })
    .spread((semesterclass, created) => {
         if(!created){
             throw ('Provided class already exists');
         }else{
            res.status(201).send({
                'status':true,
                'response':semesterclass
              });
         }
    }).catch(error => res.status(400).send({
       status:false,
        error:error
      }))
  },

  //GET /classes/:id

  retrieve(req, res) {
    return SemesterClass
      .findById(req.params.id)
      .then(semesterclass => {
        if (!semesterclass) {
          return res.status(404).send({
            status:false,
            message: 'Semester Class Not Found',
          });
        }
        return res.status(200).send({
          status:true,
          response:semesterclass
        });
      })
      .catch(error => res.status(400).send(error));
  },
  //list all classes
  list(req, res) {
    let pageSize = parseInt(req.query.pageSize, 10) || 20;
    let pageNumber = parseInt(req.query.pageNumber, 10) || 1;
    let offset = (pageNumber && pageNumber > 0) ? (pageNumber-1)*pageSize : 0;
    return SemesterClass
     .findAll(
      {
        limit: pageSize,
        offset: offset,
        order: [
          ['updatedAt', 'DESC'],
        ],
        include:[{model:Professor}],
      })
      .then(semesterclass => res.status(200).send({
        'status':true,
        'response':semesterclass
      }))
      .catch(error => res.status(400).send({
       status:false,
        error:error
      }));
  },

  //POST /classes/:id/professor
  //Add provided professor to a semester class.
  addProfessorToClass(req, res) {
  return Professor
  .find({
      where: {
          id: req.body.professor_id,
      },
      })
      .then(professor => {
      if (!professor) {
          return res.status(400).send({
          status:false,
          message: 'Provided Professor does not exists.',
          });
      }
      let values = {    ProfessorId: req.body.professor_id, };
      
      let selector = { 
          where: { 
            id: req.params.id,
          }
      };
          return SemesterClass
          .update(values, selector)
          .then(semester => res.status(200).send(
              { 
                  status:true,
                  message:'Professor updated successfully.'
              }
          ))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
},

//GET /students/{id}/classes
//Should return the semester classes student is part of (including the professor teaching the class).

getClassStudents(req, res) {
    let pageSize = parseInt(req.query.pageSize, 10) || 20;
    let pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        let offset = (pageNumber && pageNumber > 0) ? (pageNumber-1)*pageSize : 0;
    return SemesterClass
    .findAll(
      {
        where:{
          id: req.params.id
        },
        limit: pageSize,
        offset: offset,
        include: [
          {
            model: Professor,
          },
          {
            model: Student,
          }
        ],
      })
      .then(semesterclass => {
        // console.log(semesterclass.data);
        //   if (!semesterclass.dataValues.Students) {
        //     return res.status(404).send({
        //     status:false,
        //     message: 'Provided class does not have any student.',
        //     });
        // }
        return res.status(200).send({

          'status':true,
          'response':semesterclass
        });
      })
      .catch(error => res.status(400).send({
       status:false,
        error:error
      }));
     
}, 
};