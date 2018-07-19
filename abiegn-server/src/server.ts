import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
const mongodb = require('mongodb');
const multer = require('koa-multer');

// import * as data from './parsers/honda/2018_Civic.json';

const port = '4200';
const DB_URL = "mongodb://localhost:27017";

const app = new Koa();
const router = new Router();

let db, client;
router.get('/nbi/autospecs', async (ctx) => {
    // console.log("Getting a collection from DB...");
    const specs = await db.collection('autospec-parsed').find().toArray();
    ctx.body = specs;
});

// Example code for uploading files
// const uploader = multer({ dest: 'uploads/' }); 
// router.post('/profile', uploader('avatar'));

app.use(router.routes()).use(router.allowedMethods());
app.use(bodyParser());
app.use(logger());

(async () => {
    const client = await mongodb.MongoClient.connect(DB_URL, { useNewUrlParser: true });
    db = client.db("abiegn");
    // console.log("Connection to DB is open");
})();

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

