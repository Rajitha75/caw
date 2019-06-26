const express = require('express');
var router = express.Router();
const config = require('../config/config');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



router.post('/login',(req,res) => {
    console.log(req.body);
    var token = jwt.sign({username: req.body.username, password:req.body.passowrd}, config.secretkey,
        {expiresIn: 86400
    });
console.log(token);
    res.status(200).send({
        auth: true,
        accessToken: token
    });
})


module.exports = router;