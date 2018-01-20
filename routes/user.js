var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// tutaj robimy routa do tworzenia nowego uzytkownika
// trzeba zrobic encrypting password
// uzywamy tutaj bcryptjs ,fajnie jak polaczenie by bylo jeszcze szyfrowane
// bcrypt.hashSync znaczy ze haszowac synchronicznie druga opcja jest sila hasowania czyli salting algorithm
// ten algorytm jest jednostronny

router.post('/', function (req, res, next) {
   var user = new User({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       password: bcrypt.hashSync(req.body.password ,10),
       email: req.body.email
   });
   user.save(function(err , result){
       if(err) {
           return res.status(500).json({
               title: 'An error occured',
               error: err

           })
       }
       //201 resource was created
       res.status(201).json({
           message: 'User created',
           obj: result
       });
   });
});

// Pamietaj, że email jest ustawiony na unique wiec bedzie tylko 1
// sciezka bedzie wygladac tak 'users/signin
router.post('/signin', function (req, res, next) {
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user){
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        // do porownania hasła uzywamy tej samej bibliteki teraz robimy porownanie
       if(bcrypt.compareSync(req.body.password, user.password)){
           return res.status(401).json({
               title: 'Login failed',
               error: {message: 'Invalid login credentials'}
           });
       }
       // teraz tworzemy tokena do autentykacji
        // zawiera on dane gdzie dany user, secret- tutaj wpisuje sie jakias nazwe dla podwyzszenia bezpieczenstwa
        // i czas w sekundach do wygasniecia
        var token = jwt.sign({user: user}, 'secret', {expiresIn:7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});
module.exports = router;
