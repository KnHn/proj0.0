var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/mydb';
//var url = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
//var url = 'mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+":"+process.env.OPENSHIFT_MONGODB_DB_PORT;
//url + "/"+helionproduction;
var itemList;
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
//mongoose.model('test',{taken:Boolean});

/*
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
          if(items.length ==2){
            var doc1 = {"id": 10, "taken": true};
            collection.insert(doc1, {w:1}, function(err, result) {
              if(!err){
                  console.log(result);
              }
              else{
                console.log(err);
              }
          });
        }
      }
      });

    }
  });
  */
  router.get('/', function(req, res, next) {


    if(!req.param('id')){
      res.send("check url");
    }
    else{
      MongoClient.connect(url,function(err,db){
          if(!err){
            console.log('connected to:' + url);
            var collection = db.collection('newCollection');
            collection.find().toArray(function(err, items) {
              if(err){
                console.log("something went wrong with pulling data.");
              }
              else{
                console.log("num of items:" + items.length);
                itemList = items;
                  var doc1 = {"id": parseInt(req.param('id')), "taken": true};
                  collection.insert(doc1, {w:1}, function(err, result) {
                    if(!err){
                        res.send("Added node: "+req.param('id')+" with taken=true");
                    }
                    else{
                          console.log("wrong");
                    }
                });

            }
            });

          }
        });
    }

  });


module.exports = router;
