import UserService from '@/services/user.service';
import EventBus from "@/common/EventBus";

export const user = {
    namespaced: true,
    state: {
        user: {},
        blockedUsers: [],
        followedUsers: [],
        chats: [],
    },
    actions: {
        setUser({commit}) {
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
        followUser({commit}, followedUser) {
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
        unfollowUser({commit}, unfollowedUser) {
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
        blockUser({commit}, blockedUser) {
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
        unblockUser({commit}, unblockedUser) {
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
        updateUsername({commit}, username) {
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
        uploadImage({commit}, formData) {
            console.log(formData.get('image'));
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
                        );
                    } else {
                        throw response.data.message;
                    }
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
            if (resUser.blockedUsers !== undefined) {
                state.blockedUsers = resUser.blockedUsers;
            }
            if (resUser.followedUsers !== undefined) {
                state.followedUsers = resUser.followedUsers;
            }
            if (resUser.chats !== undefined) {
                state.chats = resUser.chats;
            }
        },
        setUsername(state, username) {
            state.user.username = username;
        }
    }
}