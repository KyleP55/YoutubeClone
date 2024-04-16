require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const url = process.env.DATABASE_URL;

const accountRouter = require("./routes/accountRoutes.js");
const videoRouter = require("./routes/videoRoutes.js");

app.use(express.json());
app.use('/accounts', accountRouter)
app.use('/videos', videoRouter);


try {
    mongoose.connect(url);
    console.log('Connected to Database');
} catch (err) {
    console.log(err);
}

app.listen(3001, () => {
    console.log('Sever running on 3001');
});