var mongoose = require("mongoose");
var { Schema } = mongoose;

var contactSchema = new Schema({
    name : String,
    surname : String,
    email : {
        type: String,
        required: true,
        unique: true
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

module.exports = mongoose.model("Contact", contactSchema);
