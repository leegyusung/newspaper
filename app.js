const express = require('express');
const schedule = require('node-schedule');
const main = require('./main.js');
const api = require('./api.js')

const app = express();

app.set('port', process.env.PORT || 3000);

//promise {pending} 을 반환했기때문에
(async () => {
    let data = await main.renderDomString();
    await api.sendKakaoMessage(data);
})();


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
    // schedule.scheduleJob('1 * * * * *', function(){
    //     main.getNewsList();
    // });
});