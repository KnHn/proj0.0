var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/mydb';
//var url = 'mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+":"+process.env.OPENSHIFT_MONGODB_DB_PORT;
//url + "/"+helionproduction;
var itemList;
var MongoClient = require('mongodb').MongoClient;
var stringToBool;

  router.get('/', function(req, res, next) {


    if(!req.param('id')||!req.param('taken')){
      res.send("check url");
    }
    else{

      MongoClient.connect(url,function(err,db){
          if(!err){
            console.log('connected to:' + url);
            var collection = db.collection('newCollection');
            collection.find().toArray(function(err, items) {
              if(err){
                console.log("something went wrong");
              }
              else{
                console.log("num of items:" + items.length);
                itemList = items;
                if(req.param('taken')=== "true"){

                  stringToBool = true;
                }
                else{
                  stringToBool = false;
                }
                  collection.updateOne({"id":parseInt(req.param('id'))}, {$set: {"taken":stringToBool}}, function(err, result) {
                    if(!err){
                        res.send("Updated node: "+req.param('id')+" with taken="+ req.param('taken'));
                    }
                    else{
                        res.send("Something went wrong...");
                    }
                });

            }
            });

          }
        });
    }

  });


module.exports = router;
