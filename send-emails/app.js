require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const { sendEmailEthereal, sendEmail } = require('./controllers/sendEmail');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

const html = `
<h1>Email Project</h1>
<a href="/send-ethereal">send email to Ethereal</a><br>
<a href="/send-smtp">send email to real mail server</a>
`;

// routes
app.get('/', (req, res) => {
  res.send(html);
});
app.get('/send-ethereal', sendEmailEthereal);
app.get('/send-smtp', sendEmail);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
