import api from './api';

class UserService {
    getUser() {
        return api.get('/v1/user');
    }

    searchUser(query) {
        return api.get(`/v1/search?q=${query}`);
    }

    followUser(id) {
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

    updateUsername(username) {
        return api.put(`/v1/user/update-username`, {username});
    }

    uploadImage(formData) {
        return api.post(`/v1/user/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        );
    }

    updatePassword(oldPassword, newPassword) {
        return api.put(`/v1/user/update-password`, {oldPassword: oldPassword, newPassword: newPassword});
    }
}

export default new UserService();