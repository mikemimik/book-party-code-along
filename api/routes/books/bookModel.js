'use strict';

const mongoose = require('mongoose');
const { Schema }  = mongoose;

// Map to fields in the DB
const bookSchema = new Schema({
  title: String,
  authorName: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);