import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from TypeScript Express!');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
