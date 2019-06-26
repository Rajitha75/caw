const express = require('express');
var router = express.Router();
const authservice = require('../services/auth.service');
const sharp = require('sharp');
var fs = require('fs');
var http = require('http');
const path = require('path');
const request = require('request');
var jsonpatch = require('fast-json-patch')

router.get('/',authservice.checkToken, function(req,res) {
  console.log(req.headers) ;
});

router.get('/jsonpatch',function(req,res){
    var jsonobject = {
          "empId": 1,
          "name": "Sachin",
          "surname": "Tendulkar",
          "lastname":"",
          "designation": "Software Engineer",
          "assignments" : {"role" : "testing"},
          "emails": [{"email":"user1@gmail.com"},{"email":"user1email@gmail.com"}],
          "roles" : [{"role": "coding"}, {"role": "debugging"}, {"role": "unit testing"}]
        };

        var jsonpatchobject = [
            { "op": "add", "path": "/roles/4", "value": {"role": "hosting"} },
            { "op": "remove", "path": "/roles/0" },
            { "op": "replace", "path": "/emails/0/email", "value": "xyz@gmail.com" },
            { "op": "copy", "from": "/surname", "path": "/lastname" },
            { "op": "move", "from": "/assignments", "path": "/roles/5" },
          ];

          var jsonobject =jsonpatch.applyPatch(jsonobject, jsonpatchobject).newDocument;
          res.status(200).send({
            jsonobject: jsonobject
        });
          
});

router.get('/imagedownload',authservice.checkToken, function(req,res){
    var mainuri = req.query.uri;
    console.log(path.basename(mainuri));
    var dir = './download';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
var filename = path.basename(mainuri);
var filepath = dir+'/'+filename;
    request.head(mainuri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      request(mainuri).pipe(fs.createWriteStream(filepath)).on('close', function() {
        var resizedir = './thumbnail';

        if (!fs.existsSync(resizedir)){
            fs.mkdirSync(resizedir);
        }
        var inputFile=require('path').join(__dirname,'../download/'+filename);
        var outFile = 'thumbnail/'+filename;
       imageresize(inputFile, outFile);
      });
    });

   
    
   
});

var imageresize = function(inputFile, outFile){
    console.log(inputFile)
    // input stream
    let inStream = fs.createReadStream(inputFile);
    // output stream
    let outStream = fs.createWriteStream(outFile, {flags: "w"});
    outStream.on('error', function() {
        console.log("Error");
    });
    // on success of output file being saved
    outStream.on('close', function() {
        console.log("Successfully saved file");
    });
    // resize image
    let transform = sharp()
                        .resize({ width: 50, height: 50 })
                        .on('info', function(fileInfo) {
                            console.log("Resizing done, file not saved");
                        });

    inStream.pipe(transform).pipe(outStream);
}   


module.exports = router;