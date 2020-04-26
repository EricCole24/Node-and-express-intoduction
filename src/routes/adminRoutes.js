const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
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

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to server');
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}
module.exports = router;
