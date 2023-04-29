<template>
    <div @click="clearChat(); openChat(followedUser)" class="clearfix">
        <img :src="followedUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ followedUser.username }}</div>
            <div class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
        <div>
            <button @click="unfollowUser(followedUser)"
                    class="btn btn-outline-secondary trash">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/user.service";
export default {
    props: {
        followedUser: {
            type: Object,
            required: true,
        },
    },
    methods: {
        clearChat() {
            this.showChat = false;
            this.chatUser = {};
        },
        openChat(chatUser) {
            this.showChat = true;
            this.chatUser = chatUser;
            this.message = '';
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
    },
}
</script>

<style lang="scss" scoped>

</style>