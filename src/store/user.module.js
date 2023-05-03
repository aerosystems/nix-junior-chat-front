import UserService from '@/services/user.service';
export const user = {
    namespaced: true,
    state: {
        user: {},
        followedUsers: [],
        blockedUsers: [],
        chatUsers: []
    },
    actions: {
        followUser(user) {
            UserService.followUser(user.id).then(
                response => {
                    console.log(response.data.data);
                    this.user = response.data.data;
                    this.followedUsers = response.data.data.followedUsers;
                    this.blockedUsers = response.data.data.blockedUsers;
                    this.chats = response.data.data.chats;
                },
                error => {
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        unfollowUser(user) {
            UserService.unfollowUser(user.id).then(
                response => {
                    console.log(response.data.data);
                    this.user = response.data.data;
                    this.followedUsers = response.data.data.followedUsers;
                    this.blockedUsers = response.data.data.blockedUsers;
                    this.chats = response.data.data.chats;
                },
                error => {
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        blockUser(user) {
            UserService.blockUser(user.id).then(
                response => {
                    console.log(response.data.data);
                    this.user = response.data.data;
                    this.followedUsers = response.data.data.followedUsers;
                    this.blockedUsers = response.data.data.blockedUsers;
                    this.chatUsers = response.data.data.chats;
                },
                error => {
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        unblockUser(user) {
            UserService.unblockUser(user.id).then(
                response => {
                    console.log(response.data.data);
                    this.user = response.data.data;
                    this.followedUsers = response.data.data.followedUsers;
                    this.blockedUsers = response.data.data.blockedUsers;
                    this.chatUsers = response.data.data.chats;
                },
                error => {
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        deleteChatUser(user){
            UserService.deleteUserChat(user.id).then(
                response => {
                    console.log(response.data.data);
                    this.user = response.data.data;
                    this.followedUsers = response.data.data.followedUsers;
                    this.blockedUsers = response.data.data.blockedUsers;
                    this.chatUsers = response.data.data.chats;
                },
                error => {
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    }
}