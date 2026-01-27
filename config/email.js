const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    //  Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //  Define email options
    const mailOptions = {
        from: '"Project Support" <support@yourproject.com>',
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    // Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;