const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    videoPath: {
        type: String,
        require: true
    },
    thumbnailPath: {
        type: String,
        require: true
    },
    uploader: {
        type: String,
        require: false
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    runTime: {
        type: String,
        require: true
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('videos', videoSchema);