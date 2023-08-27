const express = require('express');
const app = express();
const noteRouter = require('./src/routes/noteRoutes');
const userRouter = require('./src/routes/userRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors');
dotenv.config();
// to conver the body of request to json object
app.use(express.json());

const Portno=process.env.PORT ||3000;

app.use(function (req, res, next) {
    console.log("Http Method is : "+req.method+ ", Url is : "+req.url);
    next();
});

app.use(cors());

app.use('/users', userRouter);
app.use('/note', noteRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connection"); 
    })
    .catch((error) => {
        console.log("Error to connect to cluster");
    }
    )



app.listen(Portno, () => {
    console.log('listening on port '+Portno);
})