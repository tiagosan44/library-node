import express from 'express';

const bookRouter = express.Router();

function router(nav, client) {
  bookRouter.route('/')
    .get((req, res) => {
      const getBooks = async () => {
        const { rows } = await client.query('select * from library.books');
        res.render('bookListView', { title: 'My library ', nav, books: rows });
      };
      getBooks();
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const getBookById = async (id) => {
        const { rows } = await client.query('select * from library.books where id = $1', [id]);
        res.render('bookView', { title: 'My library ', nav, book: rows[0] });
      };
      const { id } = req.params;
      getBookById(id);
    });
  return bookRouter;
}

export { router as default };
