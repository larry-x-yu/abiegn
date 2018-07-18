import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
const mongodb = require('mongodb');

// import * as data from './parsers/honda/2018_Civic.json';

const port = '4200';
const DB_URL = "mongodb://localhost:27017";

const app = new Koa();
const router = new Router();

let db;
router.get('/nbi/autospecs', async (ctx) => {
    // console.log("Getting a collection from DB...");
    const specs = await db.collection('autospec-parsed').find().toArray();
    ctx.body = specs;
});

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
        if(!db) {
            setTimeout(check, 100);
        } else {
            resolve(true);
        }     
    };
    check();
});

module.exports = { server, ready };

