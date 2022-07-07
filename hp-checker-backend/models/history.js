// The History model

var mongoose = require('mongoose') ,Schema = mongoose.Schema ,ObjectId = Schema.ObjectId;

var historySchma = new Schema({
    thread: ObjectId,
    date: {type: Date, default: Date.now},
    address: String, 
    honeypot: Boolean, 
    rugpull: Boolean, 
    post: String,
    net: String,
});

module.exports = mongoose.model('History', historySchma);