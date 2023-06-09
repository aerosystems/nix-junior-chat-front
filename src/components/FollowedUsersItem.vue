<template>
    <div @click="openChat(followedUser)"
         @mouseover="showTrashButton[followedUser.id] = true"
         @mouseleave="showTrashButton[followedUser.id] = false"
         class="clearfix">
        <img :src="followedUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ followedUser.username }}</div>
            <div v-if="followedUser.status === 'online'" class="status">
                <i class="fa fa-circle online"></i> online
            </div>
            <div v-else class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
        <div>
            <button @click="unfollowUser(followedUser)"
                    v-if="showTrashButton[followedUser.id]"
                    class="btn btn-outline-secondary trash">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import ChatService from "@/services/chat.service";

export default {
    name: "FollowedUsersItem",
    props: {
        followedUser: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showTrashButton: [],
        }
    },
    methods: {
        openChat(user) {
            this.$store.dispatch('ui/showChat');
            this.$store.dispatch('chat/setCompanion', user);
            ChatService.getChatId(user.id).then(
                response => {
                    this.$store.dispatch('chat/setChatId', response.data.data.id);
                    this.$store.dispatch('chat/getHistoryMessages', response.data.data.id);
                },
                error => {
                    if(error.response.status === 404) {
                        ChatService.createChat(user.id).then(
                            response => {
                                this.$store.dispatch('chat/setChatId', response.data.data.id);
                                this.$store.dispatch('chat/getHistoryMessages', response.data.data.id);
                            },
                            error => {
                                this.content =
                                    (error.response && error.response.data && error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                            }
                        );
                    }
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
        unfollowUser(user) {
            this.$store.dispatch('user/unfollowUser', user);
        },
    },
    computed: {
        ...mapState({
            userState: state => state.user.user,
            chatIdState: state => state.chat.chatId,
        }),
    },
}
</script>

<style lang="scss" scoped>

</style>