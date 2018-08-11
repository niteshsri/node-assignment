const Student = require('../models').Student; //student model
const SemesterClass = require('../models').SemesterClass; // semesterClass model

const Sequelize = require('sequelize');//postgres ORM
const Joi = require('joi'); //for input schema valiation

//schema for student creation
const CreateSchema = Joi.object().keys({
    name: Joi.string().trim().regex(/^[a-zA-Z0-9 ]{3,30}$/).required(),
    admissionDate: Joi.date().required(),
});
//schema for valid get request parameters
const ListSchema = Joi.object().keys({
    active:Joi.boolean(),
    admissionYearAfter: Joi.number().integer().min(1990).allow(0),
    admissionYearBefore: Joi.number().integer().min(1990).allow(0),
});

//schema for patch reqest which can contain name only 
const PartialUpdateSchema = Joi.object().keys({
    name: Joi.string().trim().regex(/^[a-zA-Z0-9 ]{3,30}$/).required(),
})


module.exports = {
    
   /**
    * POST /students
    * To creatre student
    */
//create method
  create(req, res) {
    //validating input parameters with Joi create schema
    Joi.validate({ name: req.body.name, admissionDate: req.body.admissionDate }, CreateSchema, (err, value)=> {
        if(!(err === null)){
            return res.status(400).send({
                status:false,
                message: 'Kindly provide valid values.',
              });
        }
    });

    
    Student
    .create({
        name: req.body.name,
        admissionDate: req.body.admissionDate,
        active:true, 
    })
      .then(student => {
        //finding the autopopulated value by hooks
        //dont get confused it is basically for  getting the full student row after
        // the hook updated the rollNo (autopopulated, unique and same as id)  

          let studentId = student.id;
          return Student
          .findById(studentId)
          .then(student => {
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
  
  /***
   * Get student method. It supports following urls
   * '/api/students'
   * '/api/students?pageNumber=1&pageSize=10'
   * '/api/students?classes[]=1&classes[]=2'
   * '/api/students?admissionYearAfter=2017&active=false'
   * '/api/students?admissionYearAfter=2017&active=true'
   * '/api/students?admissionYearBefore=2018&active=true'
   * '/api/students?admissionYearAfter=2017&admissionYearBefore=2018&active=true'
   * '/api/students?admissionYearAfter=2017&admissionYearBefore=2018&active=true&classes[]=1&classes[]=2'
   * '/api/students?admissionYearAfter=2017&admissionYearBefore=2018&active=true&classes[]=1&classes[]=2&pageNumber=1&pageSize=10'
   **/

  list(req, res) {
    let pageSize = parseInt(req.query.pageSize, 10) || 20;
    let pageNumber = parseInt(req.query.pageNumber, 10) || 1;
    
    let offset = (pageNumber && pageNumber > 0) ? (pageNumber-1)*pageSize : 0;
    // let active = (req.query.active)?1:0;
    let admissionYearAfter  = (typeof req.query.admissionYearAfter !== 'undefined')?req.query.admissionYearAfter:0;
    let admissionYearBefore  = (typeof req.query.admissionYearBefore !== 'undefined')?req.query.admissionYearBefore:0;
    let active  = (typeof req.query.active !== 'undefined')?req.query.active:true;
    //validating query parameter
    Joi.validate({ admissionYearAfter: admissionYearAfter, admissionYearBefore: admissionYearBefore,active:active }, ListSchema, (err, value)=> {
        if(!(err === null)){
            return res.status(400).send({
                status:false,
                message: 'Kindly provide valid values.',
              });
        }
    });
    //fetching classes array from url
   // 1. classes - should accept list of class IDs - filters out students from the given list of classes.
    let classes  = (typeof req.query.classes !== 'undefined')?req.query.classes:false;
    let condition ={}; //to build where condition
    let includeModel ={}; //to make lis of models to be included 
    if(classes){
        condition={
            SemesterClassId:{
                $in:classes    //in query fetch students of different classes
            }
        }
        includeModel=[{
            model: SemesterClass,
            // as: 'SemesterClass',
          }]
    }
    //condition for active
    condition['active']=active;
   
    //2. admissionYearAfter - accepts year in format (yyyy) - should filters students whose admissionDate is in or after the given year.
    //3. admissionYearBefore - accepts year in format (yyyy) - should filters students whose admissionDate is before the given year.
    let  admissionDateQuery='';
    let currentYear = new Date();
    currentYear = currentYear.getFullYear();
    
    if(admissionYearBefore && !admissionYearAfter){
        admissionDateQuery = Sequelize.where(Sequelize.fn('date_trunc','YEAR', Sequelize.col('admissionDate')), '<',new Date(admissionYearBefore));
    }
    else if(admissionYearAfter && !admissionYearBefore){
        //admissionYearAfter should not be greater than current year
        if(admissionYearAfter > currentYear){
            return res.status(400).send({
                status:false,
                message: 'admissionYearAfter should be less than or equal to '+currentYear,
              });
        }
        admissionDateQuery = Sequelize.where(Sequelize.fn('date_trunc','YEAR', Sequelize.col('admissionDate')), '>=',new Date(admissionYearAfter));
    }
    else  if(admissionYearAfter && admissionYearBefore){
        //if both admissionYearAfter and admissionYearBefore are passed then admissionYearAfter < admissionYearBefore
        //e.g. result after 2017 and before 2018
        if(admissionYearBefore <= admissionYearAfter){
            return res.status(400).send({
                status:false,
                message: 'admissionYearBefore should be greater than admissionYearAfter.',
              });
        }
          //admissionYearAfter should not be greater than current year
        if(admissionYearAfter > currentYear){
            return res.status(400).send({
                status:false,
                message: 'admissionYearAfter should be less than or equal to '+currentYear,
              });
        }
          //admissionYearBefore should not be greater than current year
        if(admissionYearBefore > currentYear){
            return res.status(400).send({
                status:false,
                message: 'admissionYearBefore should be less than or equal to '+currentYear,
              });
        }
       //merging queries with AND
        admissionDateQuery = {
          
                $and: [
                    Sequelize.where(Sequelize.fn('date_trunc','YEAR', Sequelize.col('admissionDate')), '>',new Date(admissionYearAfter)),
                    Sequelize.where(Sequelize.fn('date_trunc','YEAR', Sequelize.col('admissionDate')), '<=',new Date(admissionYearBefore))
                 ]
            
        }
    }

    //execution
     Student
     .findAll(
      {
        where:{
            $and: [
                admissionDateQuery,
                 condition
              ]
        },

        limit: pageSize,
        offset: offset,
        
        include:  includeModel,
        include:[{model:SemesterClass}],
        order: [
            ['updatedAt', 'DESC'],
          ],
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
/**
 * GET /student/:id
 */
  retrieve(req, res) {
    return Student
      .findById(req.params.id)
      .then(student => {
        if (!student) {
          return res.status(404).send({
            status:false,
            message: 'Provided student does not exist.',
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
  /**
   *  DELETE /students/{id}
   *  To make the student inactive.
   */
  destroy(req, res) {
    return Student
    .find({
        where: {
          id: req.params.id
        },
      })
      .then(student => {
        if (!student) {
          return res.status(404).send({
            status:false,
            message: 'Provided student does not exist.',
          });
        }
        if(!student.dataValues.active){
            return res.status(400).send({
                status:false,
                message: 'Provided student is already deleted.',
              });
        }
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

/**
 * PATCH /student/:id
 * Allows updating of only name attribute for the given student.
 */
  partialUpdate(req, res) {

        //allowing only one input : name for patch  
      if (!(Object.keys(req.body).length == 1 && typeof req.body.name !== 'undefined')) {
        return res.status(400).send({
          status:false,
          message: 'Only student\'s name can be updated.',
        });
      }
      Joi.validate({ name: req.body.name }, PartialUpdateSchema, (err, value)=> {
        if(!(err === null)){
            return res.status(400).send({
                status:false,
                message: 'Kindly provide valid values.',
              });
        }
    });
    return Student
    .find({
        where: {
          id: req.params.id,
        },
      })
      .then(student => {
        if (!student) {
          return res.status(404).send({
            status:false,
            message: 'Provided student does not exist.',
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

/**
 * POST /classes/{id}/students
 * Add provided students to a semester class.
 * array should be passed in body having key studentIds
 */

  addStudentToClass(req, res) {
    if ((typeof req.body.studentIds === 'undefined')) {
        return res.status(400).send({
          status:false,
          message: 'Kindly provide valid Student ids'
        });
      }  
      console.log(req.body.studentIds);
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
                return res.status(404).send({
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