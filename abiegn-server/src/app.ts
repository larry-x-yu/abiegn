const express = require('express');
const app = express();

const port = '4200';

app.use(express.static('dist', {
    maxAge: 1209600
}));

app.listen(port, function () {
    console.log('Abiegn listening on port: ' + port + '!');
});
