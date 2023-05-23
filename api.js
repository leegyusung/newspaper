const axios = require('axios');
const CONSTANTS = require('./constants');

module.exports = {
    //데일리벳 기사 api
    async getNewsList() {
        try {
            return await axios.get("https://www.dailyvet.co.kr/category/news");
        } catch (error) {
            console.log(error);
        }
    },

    async getCode() {
        try {
            return await axios.get('https://kauth.kakao.com/oauth/authorize?client_id=ca3c3e864119e6cea27301d82ebfc96c&response_type=code&redirect_uri=https://localhost:3000/oauth')
                .then(res => {
                    console.log(res);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getAccessToken() {
        try {
            const data = {
                'grant_type': 'authorization_code',
                'client_id': CONSTANTS.KAKAO.REST_API_KEY,
                'redirect_uri': CONSTANTS.KAKAO.REDIRECT_URL,
                'code': CONSTANTS.KAKAO.CODE
            };

            const header = {
                "Content-type": 'application/x-www-form-urlencoded'
            };
            return await axios.post(`${CONSTANTS.KAKAO.HOST}/oauth/token`, data, { headers: header });
        } catch (error) {
            console.log(error)
        }
    },

    async sendKakaoMessage() {
        //     try {
        //         return await axios.post(`${HOST}/v2/api/talk/memo/default/send`, {
        //             data: {
        //                 "template_object": json.dumps({
        //                     "object_type": "text",
        //                     "text": "Google 뉴스: drone",
        //                     "link": {
        //                         "web_url": "https://www.google.co.kr/search?q=drone&source=lnms&tbm=nws",
        //                         "mobile_web_url": "https://www.google.co.kr/search?q=drone&source=lnms&tbm=nws"
        //                     }
        //                 })
        //             },
        //             headers: {
        //                 "Authorization": `Bearer ${CONSTANTS.REST_API_KEY}`,
        //                 "Content-Type": 'application/x-www-form-urlencoded',
        //             }
        //         });
        //     } catch (error) {

        //     }
    },
}