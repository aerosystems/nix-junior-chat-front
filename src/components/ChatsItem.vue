<template>
    <div @click="openChat(chatUser)"
         @mouseover="showTrashButton[chatUser.id] = true"
         @mouseleave="showTrashButton[chatUser.id] = false"
         class="clearfix">
        <img :src="chatUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ chatUser.username }}</div>
            <div v-if="chatUser.status === 'online'" class="status">
                <i class="fa fa-circle online"></i> online
            </div>
            <div v-else class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
            <div>
                <button @click="deleteChatUser(chatUser);"
                        v-if="showTrashButton[chatUser.id]"
                        class="btn btn-outline-secondary trash">
                    <font-awesome-icon icon="trash"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "ChatsItem",
    props: {
        chatUser: {
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
            this.$store.dispatch('chat/getHistoryMessages', {
                senderId: this.userState.id,
                recipientId: user.id,
            });
        },
        deleteChatUser(chatUser) {
            this.$store.dispatch('user/deleteChatUser', chatUser);
        },
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