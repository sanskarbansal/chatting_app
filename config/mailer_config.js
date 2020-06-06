const nodemailer = require('nodemailer'); 


//Please note Turn On Less Secure Apps on Google First to use, (https://myaccount.google.com/lesssecureapps).
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER || '<email>', 
      pass: process.env.PASS || '<password>' 
    }
});

module.exports = transporter; 