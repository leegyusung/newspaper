const express = require('express');
const schedule = require('node-schedule');
const main = require('./main.js');
const api = require('./api.js')

const app = express();

app.set('port', process.env.PORT || 3000);

// app.get('/', (req, res) => {
//     res.send('Hello, Express');
// });
// main.renderDomString();
console.log(api.getCode());

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
    // schedule.scheduleJob('1 * * * * *', function(){
    //     main.getNewsList();
    // });
});