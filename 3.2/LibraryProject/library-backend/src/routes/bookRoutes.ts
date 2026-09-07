import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createBookSchema, updateBookSchema } from '../schemas/bookSchema';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validate(createBookSchema), createBook);
router.put('/:id', validate(updateBookSchema), updateBook);
router.delete('/:id', deleteBook);

export default router;