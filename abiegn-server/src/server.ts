import * as Koa from 'koa';
// const app = require('koa')();
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
const mongodb = require('mongodb');
const multer = require('koa-multer');
const cors = require('@koa/cors');
const https = require('https');
const fs = require('fs');
require('dotenv').load();   // Load environment variables
const enforceHttps = require('koa-sslify');
const socketio = require('socket.io');
const crypto = require('crypto');
const path = require('path');

import { AutoSpec } from './parsers/types'
import ParserFactory from './parsers/parser-factory'

const port = process.env.HTTP_PORT || 3200;
const sport = process.env.HTTPS_PORT || 8443;

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017";

const app = new Koa();

app.use(cors());

const opts = {};
if (sport !== 443) { opts['port'] = sport; }

app.use(enforceHttps(opts));

const router = new Router();

let db, client;
router.get('/nbi/autospecs', async (ctx) => {
    // console.log("Getting a collection from DB...");
    const specs = await db.collection('autospec-parsed').find().toArray();
    ctx.body = specs;
});

const uploader = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads'))
        },
        filename: (req, file, cb) => {
            let customFileName = crypto.randomBytes(18).toString('hex'),
                fileExtension = file.originalname.split('.').pop(); // get file extension from original file name
            cb(null, customFileName + '.' + fileExtension);
            console.log("File saved as: " + customFileName + '.' + fileExtension);
        }
    })
});

router.post('/nbi/upload', uploader.single('specFile'), async (ctx: any, next) => {
    ctx.status = 200;
    ctx.body = "Uploaded at: " + new Date().getTime();
    console.log("File uploaded as :" + ctx.req.file.filename);
    console.log("Parsing started at: " + new Date().getTime());
    const spec: AutoSpec = await ParserFactory.parse(path.join(__dirname, '../uploads/') + ctx.req.file.filename, "Honda", 2018)
    ctx.body = JSON.stringify(spec);
    console.log(JSON.stringify(spec));
    console.log("File parsed at: " + new Date().getTime());
});

app.use(router.routes()).use(router.allowedMethods());
app.use(bodyParser());
app.use(logger());

(async () => {
    const client = await mongodb.MongoClient.connect(DB_URL, { useNewUrlParser: true });
    db = client.db("abiegn");
    // console.log("Connection to DB is open");
})();

const options = {
    key: fs.readFileSync('ssl/abiegn_private.pem', 'utf8'),
    cert: fs.readFileSync('ssl/abiegn.crt', 'utf8')
}

const sserver = https.createServer(options, app.callback()).listen(sport, () => {
    console.log('Abiegn listening on port: ' + sport + '!');
});

const server = app.listen(port, function () {
    console.log('Abiegn listening on port: ' + port + '!');
});

const wsServer = new socketio(sserver, { path: '/socket' });

wsServer.on('connection', function (socket) {
    console.log('a user connected');
});

// Used by testing tools 
const ready = new Promise((resolve, reject) => {
    const check = () => {
        if (!db) {
            setTimeout(check, 100);
        } else {
            resolve(true);
        }
    };
    check();
});

const cleanup = () => {
    if (server) server.close();
    if (sserver) sserver.close();
    if (wsServer) wsServer.close();
    if (client) client.close();
}

server['ready'] = ready;
server['cleanup'] = cleanup;

process.on('SIGINT', () => {
    console.log('Serer being shutting down, cleanup...');
    cleanup();
});

module.exports = server;