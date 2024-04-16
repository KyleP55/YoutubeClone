const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const videoSchema = require('../model/videoSchema.js');

// Storage Function
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'video') {
            cb(null, "./videos");
        }
        if (file.fieldname === 'thumbnail') {
            cb(null, "./thumbnails");
        }
    },
    filename: function (req, file, cb) {
        if (file.fieldname === 'video') {
            let format = file.mimetype.split('/')[1];
            cb(null, req.body.pathTitle + '.' + format);
        }
        if (file.fieldname === 'thumbnail') {
            let format = file.mimetype.split('/')[1];
            cb(null, req.body.pathTitle + '.' + format);
        }
    }
});
const upload = multer({ storage: storage });


// Upload Video
router.post('/upload', upload.fields([{ name: 'video' }, { name: 'thumbnail' }]), async (req, res) => {
    const title = req.body.title;

    let format = req.files.video[0].mimetype.split('/')[1];
    const videoPath = 'videos/' + req.body.pathTitle + '.' + format;

    format = req.files.thumbnail[0].mimetype.split('/')[1];
    const thumbnailPath = 'thumbnails/' + req.body.pathTitle + '.' + format;

    const uploader = req.body.uploader;
    const runTime = "??:??";

    try {
        const video = new videoSchema({
            name: title,
            videoPath: videoPath,
            thumbnailPath: thumbnailPath,
            uploader: uploader,
            runTime: runTime
        });
        const newVideo = await video.save();
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
    }
});

module.exports = router;