var  morgan = require("morgan")
require('dotenv').config()
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('middleware/error-handler');
const nodemailer = require('nodemailer');

// upload
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({origin: "*"}));
app.use(cors());
app.use(morgan('combined'));



// Generate and send OTP via email

const otpStorage = {};
app.post('/generate-otp', (req, res) => {
  const { email } = req.body;
 
  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStorage[email] = otp;
  console.log(otpStorage[email]);
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: process.env.Email,
      pass: process.env.Pass
    }
  });

  // Define email options
  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: 'OTP for Login',
    text: `Your verification OTP for CGHB is: ${otp}`
  };

  // Send the email with OTP
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send OTP:', error);
      res.status(500).json({status:400, message: 'Failed to send OTP' });
    } else {
      console.log('OTP sent successfully');
      res.status(200).json({status:200, message: otp});
      // res.status(200).json({ message: 'OTP sent successfully '${otp} });
    }
  });
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Here, you should have the logic to validate the OTP
  // against the OTP associated with the given email address.
  // You can use a database to store the OTPs and their associations.

  // For this example, we assume that the OTP is correct
  const storedOTP = otpStorage[email];
  console.log(storedOTP);
  // console.log(otp);
  if (otp == storedOTP) {
    console.log('OTP verification successful');
    res.status(200).json({ status:200, message: 'OTP verification successful' });
  } else {
    console.log('Invalid OTP');
    res.status(401).json({ status:400,message: 'Invalid OTP' });
  }
});

//send email to booked property

app.post('/userbookedproperty', (req, res) => {
  const { email } = req.body;
  const { ApplicantName } = req.body;
  const { ApplicantPhone_number } = req.body;
  const {project}=req.body
  const {property}=req.body
  const {Quarter}=req.body
  const {Quarter_Price}=req.body
 
  // Generate a random OTP
  // const otp = Math.floor(100000 + Math.random() * 900000);
  // otpStorage[email] = otp;
  // console.log(otpStorage[email]);
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: process.env.Email,
      pass: process.env.Pass
    }
  });

  // Define email options
  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: 'CGHB Booked Property Details',
    text: `Booked Property Details...
          Applicant Name        : ${ApplicantName}
          Applicant Phone Number: ${ApplicantPhone_number}
          project               : ${project}
          property              : ${property}
          Quarter               : ${Quarter}
          Quarter_Price         : ${Quarter_Price}
          `
  };

  // Send the email with OTP
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send Booked Property Details:', error);
      res.status(500).json({status:400, message: 'Failed to send Booked Property Details' });
    } else {
      console.log('Booked Property Details Send Successfully..');
      res.status(200).json({status:200, message: otp});
      // res.status(200).json({ message: 'OTP sent successfully '${otp} });
    }
  });
});





// Stripe payment
const Stripe = require('stripe');
const stripe = Stripe('Your Stripe Public Key');
const host='192.168.172.51'
app.post("/shiv/payment", async(req, res, next) => {
    try {
        const data = req.body;
        console.log(req.body);
        const params = {
            email: data.email,
            name: data.name,
        };
        const customer = await stripe.customers.create(params);
        console.log(customer.id);

        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2022-11-15'}
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(data.amount),
            currency: data.currency,
            customer: customer.id,
            automatic_payment_methods: {
            enabled: true,
            },
        });
        const response = {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
        };
        res.status(200).send(response);
    } catch(e) {
        next(e);
    }
});
 

// static img serve
app.use(express.static('property_img'));
app.use(express.static('public/uploads'));
app.use(express.static('public/image'));
app.use(express.static('public/document'));
// api routes
app.use('/shiv', require('./users/users.controller'));
app.use(errorHandler);


// storage engine 
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 400000
    }
})
app.use('/profile', express.static('uploads'));



app.post("/shiv/profileUpload", upload.single('photo'), (req, res) => {

    res.json({
        success: 1,
        // profile_url: `http://10.121.64.244:4000/${req.file.filename}`
        profile_url: `http://localhost:5000/${req.file.filename}`
    })

    
})


app.get("/upload", (req, res) => {

    res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
    console.log("get response");
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}

app.use(errHandler);
const port =  5000;
app.listen(port,
     () => console.log('Server listening on port ' + port) 
);

// start server
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

