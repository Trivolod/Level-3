import { Request, Response, NextFunction } from 'express';
import db from '../config/db';

export const getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [rows]: any = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows]: any = await db.query('SELECT * FROM books WHERE id = ?', [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, author, is_available = true } = req.body;
    const [result]: any = await db.query(
      'INSERT INTO books (title, author, is_available) VALUES (?, ?, ?)',
      [title, author, is_available]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      author,
      is_available,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, author, is_available } = req.body;

    const [result]: any = await db.query(
      'UPDATE books SET title = COALESCE(?, title), author = COALESCE(?, author), is_available = COALESCE(?, is_available) WHERE id = ?',
      [title, author, is_available, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const [result]: any = await db.query('DELETE FROM books WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};