const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({

  titulo: {
    type: String,
    required: true,
  },

  ISBN: {
    type: String,
    minlength: 13,
    maxlength: 13,
    required: true,
    unique: true,
  },

  autor: {
    type: String,
    required: true,
  },

  descripcion: {
    type: String,
    required: true,
    unique: true,
  },

  fechaPublicacion: {
    type: String,
    required: true,
  },

  precio: {
    type: Number,
    required: true,
  },

  editorial: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('book', bookSchema);
