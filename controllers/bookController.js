import mongo from 'mongodb';

const { MongoClient, ObjectID } = mongo;
const url = 'mongodb://localhost:27017';
const dbName = 'library';

function bookController(nav, bookService) {
  const middleware = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };

  const getIndex = (req, res) => {
    const getBooks = async () => {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const books = await db.collection('books').find().toArray();
      res.render('bookListView', { title: 'My library ', nav, books });
      client.close();
    };
    getBooks();
  };

  const getById = (req, res) => {
    const getBookById = async (id) => {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const book = await db.collection('books').findOne({ _id: ObjectID(id) });

      book.details = await bookService.getBookById(book.bookId);

      res.render('bookView', { title: 'My library ', nav, book });
      client.close();
    };
    const { id } = req.params;
    getBookById(id);
  };

  return { getIndex, getById, middleware };
}

export { bookController as default };
