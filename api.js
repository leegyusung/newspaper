const main = require('./main');
const axios = require('axios');
const CONSTANTS = require('./constants');
require('dotenv').config();
const { access_token } = process.env;

let template_object;

module.exports = {
    //데일리벳 기사 api
    async getNewsList() {
        try {
            return await axios.get("https://www.dailyvet.co.kr/category/news");
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
            return await axios.post(`${CONSTANTS.KAKAO.HOST_AUTH}/oauth/token`, data, { headers: header });
        } catch (error) {
            console.log(error)
        }
    },
    //카카오톡 메시지 보내기
    async sendKakaoMessage(data) {
        try {
            let aContent = new Array();
            data.forEach(element => {
                aContent.push({
                    title: element.title,
                    description: element.context,
                    image_url: element.img,
                    image_width: 640,
                    image_height: 640,
                    link: {
                        mobile_web_url: element.url
                    }
                })
            });
            template_object = {
                "object_type": "list",
                "header_title": "유정이는 오늘도 달린다.",
                "header_link": {
                    "web_url": "https://www.dailyvet.co.kr/category/news",
                },
                "contents": aContent,
                "buttons": [
                    {
                        "title": "웹으로 이동",
                        "link": {
                            "mobile_web_url": "https://www.dailyvet.co.kr/category/news"
                        }
                    },
                ]
            }

            const kakao_config = {
                method: "post",
                url: `${CONSTANTS.KAKAO.HOST_SEND}/v2/api/talk/memo/default/send`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": 'application/x-www-form-urlencoded',
                },
                data: {
                    "template_object": JSON.stringify(template_object),
                }
            }

            await axios(kakao_config)
                .then(req => {
                    console.log(req)
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getKakaoMe() {
        try {
            await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                }
            }).then(req => {
                console.log(req.data);
            })
        } catch (error) {
            console.log(error);
        }
    },

    async getKakaoFriend() {
        try {
            const kakao_config = {
                method: 'get',
                url: `${CONSTANTS.KAKAO.HOST_SEND}/v1/api/talk/friends`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": 'application/x-www-form-urlencoded',
                },
            }
            axios(kakao_config)
                .then(req => {
                    console.log(req.data);
                })
                .catch(req => {
                    console.log(req);
                })
        } catch (error) {
            console.log(error);
        }
    }
}

