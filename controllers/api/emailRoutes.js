const router = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/send', async (req, res) => {
try {
    const { confirmed } = req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });

      let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: req.session.user_email,
        subject: `${ confirmed }`,
        text: 'Hi, your appointment with Takepoint Dentistry has been scheduled. '
      };

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log('Confirmation email has been sent');
          res.status(200).json({ message: 'Email sent successfully' });
        }
      });
} catch (err) {
    console.log(err);
    res.status(400).json(err);
}

})

module.exports = router