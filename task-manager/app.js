const express = require('express');
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
require('dotenv').config();

const app = express();

// middleware

app.use(express.static('./public'));
app.use(express.json()); // to get data in req.body

// routes
app.use('/api/v1/tasks', tasksRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err.message);
  }
};

start();
