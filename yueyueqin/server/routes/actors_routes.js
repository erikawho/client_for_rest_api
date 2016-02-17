const express = require('express');
const jsonParser = require('body-parser').json();
const Actor = require(__dirname + '/../models/actor');
const handleError = require(__dirname + '/../lib/handle_error');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var actorRouter = module.exports = exports = express.Router();

actorRouter.get('/actors',(req,res) => {
  Actor.find({}, (err,data) => {
    if(err) return handleError(err);
    res.status(200).json(data);
  });
});

actorRouter.post('/actors', jsonParser, (req,res) => {
  var newActor = new Actor(req.body);
  newActor.save((err,data) => {
    if(err) return handleError(err, res);
    res.status(200).json(data);
  });
});

actorRouter.put('/actors/:id', jsonParser, (req,res) => {
  var actorUpdate = req.body;
  delete actorUpdate._id;
  Actor.update({_id:req.params.id},{actorUpdate},(err) => {
    if(err) return handleError(err);
    res.status(200).json({msg:'success'});
  });
});

actorRouter.delete('/actors/:id', (req,res) => {
  Actor.remove({_id:req.params.id}, (err) => {
    if(err) return handleError(err);
    res.status(200).json({msg:'success'});
  });
});
