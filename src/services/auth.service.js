import axios from 'axios';

const API_URL = 'http://localhost:80';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + '/user/login', {
                username: user.username,
                password: user.password
            })
            .then(function (response) {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + '/user/register', {
            username: user.username,
            password: user.password
        });
    }
}

export default new AuthService();