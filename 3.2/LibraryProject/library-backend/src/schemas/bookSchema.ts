import { z } from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    title: z
      .string({ message: 'Title must be a string' })
      .min(1, 'Title is required'),
    author: z
      .string({ message: 'Author must be a string' })
      .min(1, 'Author is required'),
  }),
});

export const updateBookSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title cannot be empty').optional(),
    author: z.string().min(1, 'Author cannot be empty').optional(),
  }),
});