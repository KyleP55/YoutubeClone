const express = require('express');
const mongoose = require('mongoose');
const app = express();

const url = 'mongodb://127.0.0.1:27017/VideoProject';

const videoRouter = require("./routes/videoRoutes.js");

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