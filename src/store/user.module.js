import UserService from '@/services/user.service';
import EventBus from "@/common/EventBus";
export const user = {
    namespaced: true,
    state: {
        user: {}
    },
    actions: {
        setUser({ commit }) {
            UserService.getUser().then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (error.response.status !== 200) {
                        EventBus.dispatch("logout");
                    }
                }
            );
        },
        followUser({ commit }, followedUser) {
            UserService.followUser(followedUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        unfollowUser({ commit}, unfollowedUser) {
            UserService.unfollowUser(unfollowedUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        blockUser({ commit}, blockedUser) {
            UserService.blockUser(blockedUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        unblockUser({ commit}, unblockedUser) {
            UserService.unblockUser(unblockedUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        deleteChatUser({ commit}, deletedChatUser){
            UserService.deleteUserChat(deletedChatUser.id).then(
                response => {
                    commit('setUser', response.data.data);
                },
                error => {
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        updateUsername({ commit }, username){
            return UserService.updateUsername(username).then(
                response => {
                    if (response.status === 200) {
                        commit('setUsername', username);
                    }
                },
                error => {
                    throw error;
                }
            );
        },
        uploadImage({ commit }, formData){
            console.log(formData.get());
            return UserService.uploadImage(formData).then(
                response => {
                    if (response.status === 200) {
                        UserService.getUser().then(
                            response => {
                                commit('setUser', response.data.data);
                            },
                            error => {
                                throw error;
                            }
                        );}
                },
                error => {
                    throw error;
                }
            );
        },
    },
    mutations: {
        setUser(state, resUser) {
            state.user = resUser;
        },
        setUsername(state, username) {
            state.user.username = username;
        }
    }
}