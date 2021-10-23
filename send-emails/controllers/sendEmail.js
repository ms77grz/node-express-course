const nodemailer = require('nodemailer');

const sendEmailEthereal = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'tressa.jerde@ethereal.email',
      pass: '7uSVqEVcWFfrQraSpv',
    },
  });
  const message = {
    from: '"Webmshop" <ms77grz@gmail.com>',
    to: 'bar@example.com, baz@example.com',
    subject: 'Testing functionality 2',
    html: '<h2>Sending Emails With NodeJS</h2>',
  };
  const info = await transporter.sendMail(message);
  res.json(info);
};

const sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const message = {
    from: `"Webmshop"<${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: 'Testing functionality',
    html: '<h2>Sending Emails With NodeJS To VT</h2>',
  };
  const info = await transporter.sendMail(message);
  res.json(info);
};

module.exports = {
  sendEmailEthereal,
  sendEmail,
};
