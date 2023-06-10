<template>
    <div @click="openChat(chat)"
         @mouseover="showTrashButton[chat.id] = true"
         @mouseleave="showTrashButton[chat.id] = false"
         class="clearfix">
        <img :src="chatUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ chatUser.username }}</div>
            <div v-if="chatUser.isOnline === true" class="status">
                <i class="fa fa-circle online"></i> online
            </div>
            <div v-else class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
        <div>
            <button @click="deleteChatUser(chat.id)"
                    v-if="showTrashButton[chat.id]"
                    class="btn btn-outline-secondary trash">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: "ChatsItem",
    props: {
        chat: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showTrashButton: [],
            userState: {},
            chatUser: {},
        }
    },
    methods: {
        openChat(chat) {
            this.$store.dispatch('ui/showChat');
            this.$store.dispatch('chat/setCompanion', this.chatUser);
            this.$store.dispatch('chat/setChatId', chat.id)
            this.$store.dispatch('chat/getHistoryMessages', chat.id);
        },
        deleteChatUser(chatId) {
            this.$store.dispatch('chat/deleteChat', chatId);
        },
    },
    mounted() {
        if (this.chat.type === 'private') {
            this.chat.users.forEach(item => {
                if (item.id !== this.user.id) {
                    this.chatUser = item;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>