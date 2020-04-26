const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'historical fiction',
      author: 'lev Nikolayevich Tolstoy',
      read: false,
    },
    {
      title: 'Man and Woman',
      genre: 'history fiction',
      author: 'Asaawa',
      read: false,
    },
    {
      title: 'Man and boy',
      genre: 'history ',
      author: 'Asaazo',
      read: false,
    },
    {
      title: 'Who are you',
      genre: 'Music',
      author: 'Eri',
      read: false,
    },
    {
      title: 'About a week',
      genre: 'Romance',
      author: 'Kwabena',
      read: false,
    },
  ];
  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'book',
        {
          nav,
          title: 'Library',
          books,
        },
      );
    });

  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('bookView', {
      nav,
      title: 'Lirary',
      book: books[id],
    });
  });
  return bookRouter;
}


module.exports = router;
