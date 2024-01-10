const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;
const cors = require('cors');
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'suprajasri.balaji@gmail.com',
        pass: 'pjtc uvtz inmk ckuz', 
    },
});

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    console.log("data",req.body);

    const mailOptions = {
        from: 'suprjasri.balaji@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
