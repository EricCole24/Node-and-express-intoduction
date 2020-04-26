const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;
const config = {
  user: 'library1',
  password: 'Coleman25',
  server: 'pslib11.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'Pslibrary',
  options: {
    encrypt: true,
  },
};
sql.connect(config).catch((err) => debug(err));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

/* const books = [
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
    author: 'Eric',
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
    res.render('books',
      {
        nav: [{ links: '/books', title: 'Books' },
          { links: '/authors', title: 'Authors' }],
        title: 'Lirary',
        books,
      });
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello singlebook');
  }); */
const nav = [{ links: '/books', title: 'Book' },
  { links: '/authors', title: 'Author' }];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.get('/', (req, res) => {
  res.render('index',
    {
      nav: [{ links: '/books', title: 'Books' },
        { links: '/authors', title: 'Authors' }],
      title: 'Library',
    });
});
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
