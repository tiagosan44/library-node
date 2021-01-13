import express from 'express';
import bookController from '../controllers/bookController.js';
import bookService from '../services/goodreadsService.js';

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleware } = bookController(nav, bookService());

  bookRouter.use(middleware);

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}

export { router as default };
