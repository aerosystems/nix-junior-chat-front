import api from './api';

class UserService {
    getUser() {
        return api.get('/v1/user');
    }
    searchUser(query) {
        return api.get(`/v1/search?q=${query}`);
    }
}

export default new UserService();