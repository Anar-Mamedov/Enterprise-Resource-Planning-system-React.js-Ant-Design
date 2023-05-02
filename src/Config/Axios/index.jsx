import axios from 'axios';
import { message } from 'antd';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers['Content-Type'] = "application/json";
axios.defaults.headers['X-Requested-With'] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 60 * 1000;

axios.interceptors.request.use(
    req => {
        if (localStorage.access_token) {
            const authentication = JSON.parse(localStorage.access_token);
            req.headers['Authorization'] = `${authentication.token_type} ${authentication.access_token}`;
        } else {
            /*
                development merhelesinde aktiv et
                asagidaki kod sonda kommente alinacaq
            */
            req.headers['Authorization'] = `${process.env.REACT_APP_TOKEN_TYPE} ${process.env.REACT_APP_TOKEN}`;

        }

        return req;
    },
    err => { });

axios.interceptors.response.use(
    res => {
        Controls(res);
        return res;
    },
    err => {
        Controls(err.response);
        return err.response;
    });

const Controls = (res) => {

    if (res) {

        const { status, messages } = res?.data;
        switch (status) {
            case 200: {
                if (messages) {
                    message.destroy('msg');
                    message.success(messages);
                }
                break;
            }
            case 201: {
                message.destroy('msg');
                message.success(messages);
                break;
            }
            case 400: {
                message.destroy('msg');
                message.error(messages);
                break;
            }
            case 401: {
                message.destroy('msg');
                message.error(messages);
                localStorage.clear();
                window.open(process.env.REACT_APP_LOGIN, '_parent');
                alert(401);
                break;
            }
            case 403: {
                message.destroy('msg');
                message.error(messages);
                break;
            }
            case 404: {
                window.open(process.env.REACT_APP_404, '_parent');
                alert(404);
                break;
            }
            case 500: {
                window.open(process.env.REACT_APP_500, '_parent');
                alert(500);
                break;
            }

            default: break;
        }
    }
}


export default axios;