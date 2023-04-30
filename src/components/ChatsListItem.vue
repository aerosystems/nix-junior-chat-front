<template>
    <div @click="openChat(chatUser)" class="clearfix">
        <img :src="chatUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ chatUser.username }}</div>
            <div class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
        <div>
            <button @click="deleteChatUser(chatUser);"
                    class="btn btn-outline-secondary trash">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatsListItem",
    props: {
        chatUser: {
            type: Object,
            required: true,
        },
    },
    methods: {
        openChat(chatUser) {
            this.$store.dispatch('ui/openChatlist', chatUser);
        },
        deleteChatUser(chatUser) {
            this.$store.dispatch('user/deleteChatUser', chatUser);
        },
    },
}
</script>

<style lang="scss" scoped>

</style>