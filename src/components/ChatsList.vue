<template>
    <ul class="list-unstyled chat-list mt-2 mb-0">
        <li v-for="chatUser in chatUsers" :key="chatUser.id">
            <chats-list-item :chatUser="chatUser"/>
        </li>
    </ul>
</template>

<script>
import ChatsListItem from "@/components/ChatsListItem.vue";
import {mapState} from "vuex";

export default {
    name: "ChatsListItem",
    components: {ChatsListItem},
    computed: {
        ...mapState({
            showChatlist: state => state.ui.showChatList,
            chatUsers: state => state.user.user.chatUsers,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>