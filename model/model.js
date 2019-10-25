var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
    name : String,
    surname : String,
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    phone:{
        type: String,
        minlenght: 9,
        maxlength: 9
    },
    date:{
        type: Date,
        default: Date.now
    }
});

var contact = module.exports = mongoose.model('contact', contactSchema);
module.exports.get = function (callback, limit) {
    contact.find(callback).limit(limit);
}