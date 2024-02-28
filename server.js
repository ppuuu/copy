const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser')
//Load env vars
let a = dotenv.config({path:'./config/config.env'});


//Connect to database
connectDB();

const app = express();

// app.get('/', (req, res) => {
//   res.status(200).json({success: true, data: {id: 1}});
// });

const hospitals = require ('./routes/hospitals');
const appointments = require('./routes/appointments');
const auth = require('./routes/auth');
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/hospitals' ,hospitals);
app.use('/api/v1/auth' ,auth);
app.use('/api/v1/appointments', appointments);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log('Server running in ', process.env.NODE_ENV,' mode on port ', PORT));
//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));



});

