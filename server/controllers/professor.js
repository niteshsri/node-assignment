const Professor = require('../models').Professor;


const Joi = require('joi');

const CreateSchema = Joi.object().keys({
    name: Joi.string().trim().regex(/^[a-zA-Z0-9 ]{3,30}$/).required(),
    designation: Joi.string().trim().regex(/^[a-zA-Z0-9._ ]{3,30}$/).required(),
});

module.exports = {
  create(req, res) {
    Joi.validate({ name: req.body.name, designation: req.body.designation }, CreateSchema, (err, value)=> {
      if(!(err === null)){
          return res.status(400).send({
              status:false,
              message: 'Kindly provide valid values.',
            });
      }
  });
    return Professor
      .create({
        name: req.body.name,
        designation: req.body.designation,
      })
      .then(professor => {
          let professorId = professor.id;
            return Professor
            .findById(professorId)
            .then(professor => {
              if (!professor) {
                return res.status(404).send({
                  status:false,
                  message: 'Unable to create professor.',
                });
              }
              return res.status(200).send({
                status:true,
                response:professor
              });
            })
            .catch(error => res.status(400).send(error)); 
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
    return Professor
      .findAll(
        {
          limit: pageSize,
          offset: offset
        })
      .then(professor => res.status(200).send({
          'status':true,
          'response':professor
      }))
      .catch(error => res.status(400).send({
        'status':false,
        'error':error
      }));
  },
  retrieve(req, res) {
    return Professor
      .findById(req.params.id)
      .then(professor => {
        if (!professor) {
          return res.status(404).send({
            status:false,
            message: 'Provided professor does not exist.',
          });
        }
        return res.status(200).send({
          status:true,
          response:professor
        });
      })
      .catch(error => res.status(400).send(error));
  },
};