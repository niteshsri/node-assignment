const Student = require('../models').Student;
const SemesterClass = require('../models').SemesterClass;
const Professor = require('../models').Professor;
module.exports = {
    //create method
  create(req, res) {
    Student
    .create({
        name: req.body.name,
        admissionDate: req.body.admissionDate,
        active:true, 
    })
      .then(student => {
          //finding the autopopulated value by hooks
          let studentId = student.id;
          return Student
          .findById(studentId)
          .then(student => {
            if (!student) {
              return res.status(404).send({
                status:false,
                message: 'Provided student not found.',
              });
            }
            return res.status(200).send({
              status:true,
              response:student
            });
          })
          .catch(error => res.status(400).send({
                'status':false,
                'error':error
            })); 
            }
        )
      .catch(error => res.status(400).send({
        'status':false,
        'error':error
      }));
  },
  list(req, res) {
    let pageSize = parseInt(req.query.pageSize, 10) || 20;
    let pageNumber = parseInt(req.query.pageNumber, 10) || 1;
    
    let offset = (pageNumber && pageNumber > 0) ? (pageNumber-1)*pageSize : 0;
    // let active = (req.query.active)?1:0;
    let admissionYearAfter  = (typeof req.query.admissionYearAfter !== 'undefined')?req.query.admissionYearAfter:true;
    let admissionYearBefore  = (typeof req.query.admissionYearBefore !== 'undefined')?req.query.admissionYearBefore:true;
    let active  = (typeof req.query.active !== 'undefined')?req.query.active:true;
    let classes  = (typeof req.query.classes !== 'undefined')?req.query.classes:false;
    let condition ={};
    let includeModel ={};
    if(classes){
        condition={
            SemesterClassId:{
                $in:classes    
            }
        }
        includeModel=[]
    }
    if(active){
        condition['active']=active;
    }
    
    console.log(condition);
    console.log(admissionYearBefore);
     Student
     .findAll(
      {
        where:condition,
        limit: pageSize,
        offset: offset,
        include: [{
            model: SemesterClass,
            as: 'SemesterClass',
          }],
        // include:[{model:SemesterClass,as:'semester_class'}]
      })
      .then(student => res.status(200).send({
        status:true,
        response:student
      }))
      .catch(error => res.status(400).send({
        status:false,
        error:error
      }));
  },
  retrieve(req, res) {
    return Student
      .findById(req.params.id)
      .then(student => {
        if (!student) {
          return res.status(404).send({
            status:false,
            message: 'Provided student not found.',
          });
        }
        return res.status(200).send({
          status:true,
          response:student
        });
      })
      .catch(error => res.status(400).send({
                'status':false,
                'error':error
            }));
  },
  destroy(req, res) {
    return Student
    .find({
        where: {
          id: req.params.id
        },
      })
      .then(student => {
        if (!student) {
          return res.status(400).send({
            status:false,
            message: 'Provided student not found.',
          });
        }
        if(!student.dataValues.active){
            return res.status(400).send({
                status:false,
                message: 'Provided student is already deleted.',
              });
        }
        console.log();
        let values = { active: false };
        let selector = { 
            where: { 
                id: req.params.id,
                active: true,
            }
        };
            return Student
            .update(values, selector)
            .then(updateStudent => res.status(200).send(
                { 
                    status:true,
                    message:'Student deleted successfully.'
                }
            ))
            .catch(error => res.status(400).send({
                'status':false,
                'error':error
            }));
      })
      .catch(error => res.status(400).send({
                'status':false,
                'error':error
            }));
  },
  partialUpdate(req, res) {
      console.log(Object.keys(req.body).length);
      if (!(Object.keys(req.body).length == 1 && typeof req.body.name !== 'undefined')) {
        return res.status(400).send({
          status:false,
          message: 'Only student\'s name can be updated.',
        });
      }
    return Student
    .find({
        where: {
          id: req.params.id,
        },
      })
      .then(student => {
        if (!student) {
          return res.status(400).send({
            status:false,
            message: 'Provided student not found.',
          });
        }
        let values = {    name: req.body.name, };
        let selector = { 
            where: { 
                id: req.params.id,
            }
        };
            return Student
            .update(values, selector)
            .then(updateStudent => res.status(200).send(
                { 
                    status:true,
                    message:'Student updated successfully.'
                }
            ))
            .catch(error => res.status(400).send({
                'status':false,
                'error':error
            }));
      })
      .catch(error => res.status(400).send({
                'status':false,
                'error':error
            }));
  },
  addStudentToClass(req, res) {
    let studentIdArray = req.body.studentIds;
    if(!studentIdArray.length){
        return res.status(400).send({
            'status':false,
            'error':'Kindly provide valid Student ids'
          })
    }
    return SemesterClass
    .find({
        where: {
            id: req.params.id,
        },
        })
        .then(classes => {
        if (!classes) {
            return res.status(400).send({
            status:false,
            message: 'Provided class does not exists.',
            });
        }
        let values = {    SemesterClassId: req.params.id, };
        
        let selector = { 
            where: { 
                id:  {$in: studentIdArray}
            }
        };
            return Student
            .update(values, selector)
            .then(updateStudent => res.status(200).send(
                { 
                    status:true,
                    message:'Student updated successfully.'
                }
            ))
            .catch(error => res.status(400).send({
                'status':false,
                'error':error
            }));
        })
        .catch(error => res.status(400).send({
                'status':false,
                'error':error
            }));
}

};