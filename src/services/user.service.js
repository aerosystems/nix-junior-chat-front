import api from './api';

class UserService {
    getUser() {
        return api.get('/v1/user');
    }
}

export default new UserService();