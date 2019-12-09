'use strict';

const Book = require('./bookModel');

// Helper function to list each of the books in the database
exports.listBooks = async () => {
  try {
    const books = await Book.find({})
    return books;
  } catch (err) {
    throw new Error(err.message)
  }
};

// Create a new book that will be added to the database
exports.createBook = async (bookData) => {
  try {
    const book = await new Book(bookData)
    const doc = await book.save()
    return doc
  } catch (err) {
    throw new Error(err.message)
  }
};


exports.getBookById = async (id) => {
  try {
    const book = await Book.findById(id)
    return book
  } catch (err) {
    throw new Error(err.message)
  }
}
