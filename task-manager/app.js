const express = require('express');
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json()); // to get data in req.body

// routes
app.get('/hello', (req, res) => {
  res.send('hello');
});

app.use('/api/v1/tasks', tasksRouter);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err.message);
  }
};

start();
