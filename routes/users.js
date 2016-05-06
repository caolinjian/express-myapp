"use strict";
var router = require('express').Router();

module.exports=function(app){
    router.get('/', function(req, res, next) {
      res.send('respond with a resource');
    });
    app.use('/user',router);
}
