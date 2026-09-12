import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'admin.html'));
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});