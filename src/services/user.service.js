import api from './api';

class UserService {
    getUser() {
        return api.get('/v1/user');
    }

    searchUser(query) {
        return api.get(`/v1/search?q=${query}`);
    }

    followUser(id) {
        console.log(id);
        return api.post(`/v1/user/follow/${id}`);
    }

    unfollowUser(id) {
        return api.delete(`/v1/user/follow/${id}`);
    }

    blockUser(id) {
        return api.post(`/v1/user/block/${id}`);
    }

    unblockUser(id) {
        return api.delete(`/v1/user/block/${id}`);
    }

    deleteUserChat(id) {
        return api.delete(`/v1/user/chat/${id}`);
    }
}

export default new UserService();