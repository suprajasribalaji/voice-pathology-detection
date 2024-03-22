const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const twilio = require('twilio');

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

app.post('/send-email-report', async (req, res) => {
    const { to, subject, text } = req.body;
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



app.post('/send-email-newcase-doctor', async (req, res) => {
    const { to, subject, text } = req.body;
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

app.post('/send-mail-newaccount-doctor',async(req,res)=>{
    const {to,subject,text} = req.body;
    const mailOptions = {
        from:'suprjasri.balaji@gmail.com',
        to,
        subject,
        text,

    };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return res.status(500);
        }
        res.status(200).send('Email Sent'+info.response)
    })

})



const accountSid = 'ACf5787791227c22c6cbf37b3058d31729';
const authToken = '87a552f713e8f4e2ac7de4a8449026c1';
const twilioClient = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    const { to, text } = req.body;

    twilioClient.messages.create({
        body: text,
        from: '+17193012636',
        to,
    })
    .then(message => {
        console.log('SMS sent:', message.sid);
        res.status(201).send('SMS sent: ' + message.sid);
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
        res.status(500).send(error.toString());
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
