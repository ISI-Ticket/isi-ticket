require('dotenv').config();
const gmailCreds = {
    user : process.env.nodemailer_user,
    pass : process.env.nodemailer_pass
}

module.exports = gmailCreds;