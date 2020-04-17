const nodemailer = require('nodemailer');
const gmailCreds = require('../../config/nodemailer')
const mailOptions = require('../../options/nodemailer/mailOptions')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: gmailCreds
})

const sendEmail = (email) =>{
    let options =  mailOptions.mailOptions(email);
    console.log(options);
    transporter.sendMail(options, (err, data) =>{
        if(err) console.log(err)
        else console.log('Email sent!');
    });
}


exports.sendEmail = sendEmail;