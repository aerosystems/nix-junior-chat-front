<template>
    <ul class="list-unstyled chat-list mt-2 mb-0">
        <li v-for="chatUser in chatUsers" :key="chatUser.id">
            <chats-item :chatUser="chatUser"/>
        </li>
    </ul>
</template>

<script>
import ChatsItem from "@/components/ChatsItem.vue";
import {mapState} from "vuex";

export default {
    name: "ChatsItem",
    components: {ChatsItem},
    computed: {
        ...mapState({
            chatUsers: state => state.user.user.chats,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>