<template>
    <div @click="openChat(foundUser)" class="clearfix">
        <img :src="foundUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ foundUser.username }}</div>
            <div v-if="foundUser.isOnline === true" class="status">
                <i class="fa fa-circle online"></i> online
            </div>
            <div v-else class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import ChatService from "@/services/chat.service";
export default {
    name: "SearchItem",
    props: {
        foundUser: {
            type: Object,
            required: true
        }
    },
    methods: {
        openChat(foundUser) {
            this.$store.dispatch('ui/showChat');
            this.$store.dispatch('chat/setCompanion', foundUser);
            ChatService.getChatId(foundUser.id).then(
                response => {
                    this.$store.dispatch('chat/setChatId', response.data.data.id);
                    this.$store.dispatch('chat/getHistoryMessages', response.data.data.id);
                },
                error => {
                    if(error.response.status === 404) {
                        ChatService.createChat(foundUser.id).then(
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

        }
    },
    computed: {
        ...mapState({
            userState: state => state.user.user,
        }),
    },
}
</script>

<style lang="scss" scoped>

</style>