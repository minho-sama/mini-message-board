const Message = require('../models/messageModel')
const {body, validationResult} = require('express-validator')
const utf8 = require('utf8')

const index = function(req, res, next) {
    Message.find()
           .sort({post_date: -1})
           .exec((err, message_list) => {
               if(err) return next(err)
               res.render('index', { title: 'Message Board', messages: message_list});
           })
}

const message_create_get = function(req, res, next) {

    res.render('message_form', { title: 'Send Message'});
}

const message_create_post = [
    body('username', 'Username must have at least 1 character').trim().isLength({min: 1}),
    body('message', 'Message field cannot be empty').trim().isLength({min: 1}),
    
    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            console.log(errors.array())
            res.render('message_form_error', {title: 'Send Message', errors: errors.array(), message: req.body})
        } else{
            console.log(req.body.message)
            const message = new Message({
                username: req.body.username,
                message: utf8.encode(req.body.message),
                post_date: new Date()
            })
            message.save(function(err){
                if(err) return next(err)
                res.redirect('/')
            })
        }
    }
]

module.exports = {
    index,
    message_create_get,
    message_create_post
}