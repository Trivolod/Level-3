import { Request, Response, NextFunction } from 'express';
import db from '../config/db';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [rows]: any = await db.query('SELECT * FROM books WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author } = req.body;
    const [result]: any = await db.query(
      'INSERT INTO books (title, author) VALUES (?, ?)',
      [title, author]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      author,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const [result]: any = await db.query(
      'UPDATE books SET title = COALESCE(?, title), author = COALESCE(?, author) WHERE id = ?',
      [title, author, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [result]: any = await db.query('DELETE FROM books WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};