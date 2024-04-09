const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { videoDuration } = require("@numairawan/video-duration");

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
})
const upload = multer({ storage: storage });
/////////////////////////////////////////////////////////////////////////////////

// Get all thumbnails/info for display
router.get('/allVideos', async (req, res) => {
    const allVideos = await videoSchema.find({});

    res.status(200).json(allVideos);
});

// Get one info for display
router.get('/info/:id', async (req, res) => {
    const info = await videoSchema.findOne({ _id: req.params.id });

    res.status(200).json(info);
});

// Get one thumbnail for display
router.get('/tn/:dir/:name', async (req, res) => {
    let file = path.join(__dirname, '../', req.params.dir, req.params.name);

    try {
        res.sendFile(file);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Get and Stream Video
router.get('/stream/:id', async (req, res) => {
    const info = await videoSchema.findById(req.params.id, 'videoPath');

    const filePath = info.videoPath;

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunckSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunckSize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }

});

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