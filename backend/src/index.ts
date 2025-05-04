import express from 'express';
import { pg_store_details } from './routes/pg/pg_store_details.js';
import { get_students } from './routes/pg/get_students.js';
import { get_courses } from './routes/pg/get_courses.js';
import CORS from 'cors';
import { pg_client } from './client/pg-client.js';
import { pg_get_student } from './routes/pg/pg_get_student.js';
import { mongo_store_details } from './routes/mongodb/mongo_store_details.js';
import { mongo_get_student } from './routes/mongodb/mongo_get_student.js';
import { mongo_client } from './client/mongo-client.js';

const app = express();


pg_client.connect()
mongo_client();

// Middleware
app.use(express.json());

app.use(CORS({
  origin: "*"
}))

// Routes
app.post('/pg-insert-detail', pg_store_details);
app.post('/mongo-insert-detail',  mongo_store_details);
app.get('/students', get_students);
app.get('/courses', get_courses);
app.post('/pg-student', pg_get_student);
app.post('/mongo-student', mongo_get_student);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
