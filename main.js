const api = require('./api.js');
const cheerio = require('cheerio');

module.exports = {
    async renderDomString() {
        const html = await api.getNewsList();
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("ul.lc08").children("li")
        $bodyList.each(function (item) {
            ulList[item] = {
                title: $(this).find('dl > dt > a').text(), //기사 제목
                img: $(this).find('div > a > img').attr('src'), //기사 썸네일
                url: $(this).find('dl > dt > a').attr('href'), //기사 링크
                context: $(this).find('dl > dd > p').text(), //기사 내용
                date: $(this).find('dl > dd').eq(1).text() //기사 날짜
            }
        })
        return ulList;
    }
}