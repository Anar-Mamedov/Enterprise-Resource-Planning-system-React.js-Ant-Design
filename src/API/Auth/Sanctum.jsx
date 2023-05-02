
import { Axios } from "../../Config";
import { message } from 'antd';

const Index = {
    csrfCookie: () => {
        return Axios.get("/sanctum/csrf-cookie").then(res => res);
    },
    signIn: (data) => {
        message.loading({ content: 'Loading...', key: "msg" });
        return Axios.post("/api/auth/login", data).then(res => {

            if (res.data.status === 200) localStorage.setItem("access_token", JSON.stringify(res.data.data));

            return res;
        });
    },
    signOut: () => {
        return Axios.get("/api/auth/logout")
            .then(res => res)
            .finally(_ => {
                localStorage.clear();
            })
    },
    signUp: (data) => {
        return Axios.post('/api/guest/singup', data).then(res => res)
    },
    checkAuth: () => {
        return Axios.get('/api/auth/check').then(res => res);
    },
    loginUser: () => {
        return Axios.get('/api/auth/user').then(res => res)
    }
}

export default Index;