var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../index");
let should = chai.should();
const request = require('request');
let posts = require('../jsondata/posts');
chai.use(chaiHttp);


    it('should list ALL blobs on /blobs GET', function(done) {
        chai.request(server)
          .get('/home/jsonpatch')
          .end(function(err, res){
           console.log(res.body)
            done();
          });
      });