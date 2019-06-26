const jwt=require('jsonwebtoken');
const config = require('../config/config');

function checktoken(req, res, next){
let token = req.headers['x-access-token'] || req.headers['authorization']; 
try{
  if(req.headers.authorization){
const token = req.headers.authorization.split(" ")[1];
jwt.verify(token, config.secretkey, function (err, payload) {
    if (payload) {
res.status(200).send({
  accessToken: token
});
    }else {
      console.log('error');
   }
})
  }else{
    console.log('Not an authorized user');
    return false;
  }
}catch(e){
console.log(e);
}
return next();

}

module.exports = {
    checkToken: checktoken
  }