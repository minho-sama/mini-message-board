const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {DateTime} = require('luxon') 

const MessageSchema = new Schema(
    {
        username: {type:String, required: true, maxLength: 40},
        message: {type: String, required: true, maxLength: 500},
        post_date: {type: Date}
    }
)

MessageSchema
    .virtual('date_formatted')
    .get(function(){
        return DateTime.fromJSDate(this.post_date).toISODate()
    })

module.exports = mongoose.model('Message', MessageSchema)