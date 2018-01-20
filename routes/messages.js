/*In this file all of messages will be connected to
* data bse
* */

var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

/*Tutaj wstawiamy get route do pobierania dancych z bazy danych
* poniewaz mamy zimportowany nasz obiekt z mongoose mozemy dac tylko Message.find()
*
* */
router.get('/', function(req,res,next){
    Message.find()
        .exec(function(err, messages){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            })
        })
});

//Tutaj mozemy dac middleware ktory uniemozliwi wykonanie dalszego kodu uzytkownikowi niezalogowanemu
//Brak tokena
//Piszemy w routerze ze dotyczy kazdej sciezki
//Wazna jest kolejnosc od gory do dolu
//Poniewaz na serverze znamy skretne pole to dzieki temu mozemy ten nasz token wydobyc
//Token bedzie w query.parameters i bedzie wygladal to '/?token=sadadsfadsf
//Na poczatku to niedziala bo nie dajemy naszego tokenu z angulara

router.use('/', function(req,res,next){
    jwt.verify(req.query.token,'secret', function(err, decoded){
        if(err){
            return res.status(401).json({ //401 not authorised
                title: 'Not Authenticated',
                error: err
            })
        }
        next(); //aby byla kontynuacja
    });
});

/*This function should store messages that's why post
 * w tym pliku jak uzywamy routera to wszystkie drogi
 * maja juz wstawione /message dlatego na dole nie musimy
 * tego dawac
 * req.body.content zapisuje wyslane z angulara dane
 * decode nie sprawdza czy token jest valid ale go dekoduje
 * jezli nie mamy verify wyzej to nie uzywaj decode
  * */
router.post('/', function(req,res, next){

    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title:'An error occurred',
                err: err
            });
        }
        //jezeli uzytkownik jest zdekodowany i znaleziony to zapisz
        //widomosc uzytkownika

        var message = new Message({
            content: req.body.content,
            user: user._id
        });
        //tutaj jest zapisywana widomosc do message collection i
        //oprocz tego zapisujemy ja do uzytkownika

        message.save(function(err, result){
            if(err){
                // wysylanie bledu do frontendu
                //tu dajemy returna zeby w razie bledu dalszy kod nie byl wykonywany
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                })
            }
            //user.messages.push(result);
            user.messages.push(result)
            user.save();
            // 201 to kod resource created
            res.status(201).json({
                message: 'Saved message',
                obj:result
            })
        });

    });


});

//Patch sluzy do update'u informacji w bazie. Mozna by dac post ale patch sluzy do updatowania
//w request.params bedzie sie znajdowalo id naszego rekordu ktory chcemy zmienic a w request.body.content
//beda znajdowaly sie dane ktore bedziemy updatowac
//po zatym stworzylismy nowy error ktory ma pasowac do naszego ogolnego schematu errorow

router.patch('/:id',function(req,res,next){
    Message.findById(req.params.id, function(err,message){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        if(!message){ //to dla przypadku gdy brak jes message
            return res.status(500).json({
                title: 'No Message Found!',
                err: {message: 'Message not found'}
            })
        }
        message.content = req.body.content;
        message.save(function(err ,result){
            if(err){
                return res.status(500).json({
                    title:'An error occurred',
                    error:err
                })
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            })
        })
    })
});

router.delete('/:id', function(req,res,next){
    Message.findById(req.params.id, function(err,message){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        if(!message){ //to dla przypadku gdy brak jes message
            return res.status(500).json({
                title: 'No Message Found!',
                err: {message: 'Message not found'}
            })
        }
        message.content = req.body.content;
        message.remove(function(err ,result){
            if(err){
                return res.status(500).json({
                    title:'An error occurred',
                    error:err
                })
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            })
        })
    })
});

module.exports = router;