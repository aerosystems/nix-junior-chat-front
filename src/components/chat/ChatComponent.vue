<template>
    <div v-if="showChatState && companionState !== {}">
        <!-- chat Header -->
        <div class="chat-header clearfix">
            <chat-header/>
        </div>
        <!-- chat History -->

        <chat-history/>

        <!-- chat Input -->
        <div class="chat-message clearfix">
            <chat-input/>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
import ChatHeader from "@/components/chat/ChatHeader.vue";
import ChatHistory from "@/components/chat/ChatHistory.vue";
import ChatInput from "@/components/chat/ChatInput.vue";

export default {
    name: "ChatComponent",
    components: {ChatInput, ChatHistory, ChatHeader},
    computed: {
        ...mapState({
            showChatState: state => state.ui.showChat,
            companionState: state => state.chat.companion,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>