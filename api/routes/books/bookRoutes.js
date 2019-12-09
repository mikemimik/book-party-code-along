'use strict';

const express = require('express');
const router = express.Router();

const bookService = require('./bookService');

// GET /books/
router.get('/', async (req, res, next) => {
  try {
    const books = await bookService.listBooks()
    return res.status(200).json({ data: books })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal server error' })
  }
})

router.get('/:bookId', async (req, res, next) => {
  const { bookId } = req.params
  try {
    const book = await bookService.getBookById(bookId)
    return res.status(200).json({ data: book })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal server error' })
  }
})

router.post('/', async (req, res, next) => {
  const { title, authorName, rating, comment } = req.body

  if (!title || title === '') {
    return res.status(400).json({ error: 'title must be provided' })
  }
  if (!authorName || authorName === '') {
    return res.status(400).json({ error: 'authorName must be provided' })
  }

  try {
    const book = await bookService.createBook({
      title,
      authorName,
      rating,
      comment
    })
    return res.status(200).json({ data: book })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal server error' })
  }
});


exports.router = router;
