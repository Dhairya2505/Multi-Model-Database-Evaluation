import express from 'express';
import { pg_store_details } from './routes/pg/store_details.js';
import { get_students } from './routes/pg/get_students.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.post('/pg-insert-detail', pg_store_details);
app.get('/students', get_students);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
