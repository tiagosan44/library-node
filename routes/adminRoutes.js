import express from 'express';
import MongoClient from 'mongodb';

const adminRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'library';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('Connected correctly to server');
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          console.log(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

export { router as default };
