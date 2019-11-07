const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: String,
  surname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    minlenght: 9,
    maxlength: 9,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

contactSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);

    this.password = hash;

    next();
  });
});

module.exports = mongoose.model('Contact', contactSchema);
