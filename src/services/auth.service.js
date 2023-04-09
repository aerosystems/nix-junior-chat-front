import axios from 'axios';

const API_URL = 'http://localhost:80/v1/';

class AuthService {
    async login(user) {
        const response = await axios
            .post(API_URL + 'user/login', {
                username: user.username,
                password: user.password
            });
        if (response.data.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data.data.access_token));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'user/register', {
            username: user.username,
            password: user.password
        });
    }
}

export default new AuthService();