<template>
    <ul v-if="showChatListState" class="list-unstyled chat-list mt-2 mb-0">
        <li v-for="chatUser in chatUsersState" :key="chatUser.id">
            <chats-item :chatUser="chatUser"/>
        </li>
    </ul>
</template>

<script>
import ChatsItem from "@/components/ChatsItem.vue";
import {mapState} from "vuex";

export default {
    name: "ChatsList",
    components: {ChatsItem},
    computed: {
        ...mapState({
            chatUsersState: state => state.user.user.chats,
            showChatListState: state => state.ui.showChatList,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>