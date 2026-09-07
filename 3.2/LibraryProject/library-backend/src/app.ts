import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/books', bookRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'School Library API is up and running!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}/docs`);
});