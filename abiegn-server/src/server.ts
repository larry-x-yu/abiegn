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

// import * as data from './parsers/honda/2018_Civic.json';

const port = '3200';
const DB_URL = "mongodb://localhost:27017";

const app = new Koa();

app.use(cors());

const router = new Router();

let db, client;
router.get('/nbi/autospecs', async (ctx) => {
    // console.log("Getting a collection from DB...");
    const specs = await db.collection('autospec-parsed').find().toArray();
    ctx.body = specs;
});

const uploader = multer({ dest: 'uploads/' });
router.post('/nbi/upload', uploader.single('specFile'), async (ctx, next) => {
    // ctx.body = {
    //     filename: ctx.req.specFile.filename
    // }
    ctx.status = 200;
    ctx.body = "Uploaded";
    console.log("File uploaded.");
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

const sport = 8443;
https.createServer(options, app.callback()).listen(sport, () => {
    console.log('Abiegn listening on port: ' + sport + '!');
});

const server = app.listen(port, function () {
    console.log('Abiegn listening on port: ' + port + '!');
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
    if (client) client.close();
}

server['ready'] = ready;
server['cleanup'] = cleanup;

process.on('SIGINT', () => {
    console.log('Serer being shutting down, cleanup...');
    cleanup();
});

module.exports = server;

