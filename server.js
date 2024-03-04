const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const {xss}=require('express-xss-sanitizer');
const rateLimit=require('express-rate-limit');
const hpp=require('hpp');
const cors=require('cors');

//Load env vars
let a = dotenv.config({path:__dirname+'/config/config.env'});

console.log(a)

//Connect to database
connectDB();

const app = express();

// app.get('/', (req, res) => {
//   res.status(200).json({success: true, data: {id: 1}});
// });

const massageshops = require ('./routes/massageshops');
const appointments = require('./routes/appointments');
const auth = require('./routes/auth');
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
//Rate Limiting
const limiter=rateLimit({
    windowMs:10*60*1000,//10 mins
    max:100
});
app.use(limiter);
app.use(hpp());
app.use(cors());

// const swaggerDocs=swaggerJsDoc(swaggerOptions);
// app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/auth' ,auth);
app.use('/massage' ,massageshops , (req , res) => {
    res.send("gg") ;
});
app.use('/api/v1/appointments', appointments);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log('Server running in ', process.env.NODE_ENV,' mode on port ', PORT));
//Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise)=>{
//     console.log(`Error: ${err.message}`);
//     //Close server & exit process
//     server.close(()=>process.exit(1));
// localhost:5000/api/v1/hospitals/qyiuwjeiqwoek

// {
//     id : qyiuwjeiqwoek
//     name : "bro"
// }
// req.body
// // });
// {
//     name : "bro" ,
//     surname : "zzz" 
// }
// req.params

// localhost:5000/api/v1/hospitals?

// req.query

