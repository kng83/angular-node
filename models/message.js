var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user')

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//dodajemy teraz w mongoose middleware ktory zostanie
//wykonany przed metoda post
//szukamy uzytkownika nastepnie robimy pull i zapisujemy

schema.post('remove', function(message){
    User.findById(message.user , function(err, user){
        user.messages.pull(message._id);
        user.save()

    });
});
module.exports = mongoose.model('Message', schema);