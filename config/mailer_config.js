const nodemailer = require('nodemailer'); 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER || 'something@gmail.com', 
      pass: process.env.PASS || 'something' 
    }
});

module.exports = transporter; 