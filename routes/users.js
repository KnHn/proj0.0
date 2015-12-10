var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var url = 'mongodb://localhost:27017/mydb';
var url = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/'

var itemList;
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
//mongoose.model('test',{taken:Boolean});


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
  router.get('/', function(req, res, next) {
    res.render('display', { title: 'mydb',number: itemList.length.toString(),items:itemList });
  });


module.exports = router;
