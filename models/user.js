var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

//Dodano usePushEach do schematu bo przez to wystepowal
//blad nowej wersji mongo ktora nie obsluguje pushall
//messages odwoluja sie do messages zawartych w modelu message

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
},{usePushEach:true});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);