
var prod = true;
var pass =  'mongodb://test-user:test_pw@ds211588.mlab.com:11588/ang-node';
if(prod === false){
    pass = 'mongodb://localhost:27017/node-angular';
}
exports.module = pass;