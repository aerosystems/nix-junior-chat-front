import axios from 'axios';
import authHeader from './auth.header';
import router from "../router";

const API_URL = 'http://localhost:80/v1/';

class AuthService {
    async login(user) {
        const response = await axios
            .post(API_URL + 'user/login', {
                username: user.username,
                password: user.password
            });
        if (response.data.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
    }

    logout() {
        axios.post(API_URL + 'user/logout', {}, {
                headers: authHeader()
            }).then(response => {
                if (response.status === 202) {
                    localStorage.removeItem('user');
                    router.push('/login');
                }
            });
    }

    register(user) {
        return axios.post(API_URL + 'user/register', {
            username: user.username,
            password: user.password
        });
    }
}

export default new AuthService();