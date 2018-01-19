/*In this file all of messages will be connected to
* data bse
* */

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

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

/*This function should store messages that's why post
 * w tym pliku jak uzywamy routera to wszystkie drogi
 * maja juz wstawione /message dlatego na dole nie musimy
 * tego dawac
 * req.body.content zapisuje wyslane z angulara dane
  * */
router.post('/', function(req,res, next){
    var message = new Message({
        content: req.body.content
    });
    message.save(function(err, result){
        if(err){
            // wysylanie bledu do frontendu
            //tu dajemy returna zeby w razie bledu dalszy kod nie byl wykonywany
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }
        // 201 to kod resource created
        res.status(201).json({
            message: 'Saved message',
            obj:result
        })
    });
});

module.exports = router;