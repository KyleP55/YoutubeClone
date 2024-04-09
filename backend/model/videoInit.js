const { MongoClient } = require('mongodb');
const accountSchema = require('./videoSchema.js');
const url = "mongodb://127.0.0.1:27017/VideoProject";

const items = require('./baseVideos.json');

const client = new MongoClient(url);

async function init() {
    try {
        client.connect();
        const db = client.db("VideoProject");
        const col = db.collection("videos");
        console.log('connected')

        await col.insertMany(items);
    } catch (err) {
        console.log(err);
    }
    client.close();
}

init();