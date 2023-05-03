<template>
  <div v-if="showChatState && chatUserState !== {}">
      <!-- Chat Header -->
      <div class="chat-header clearfix">
          <chat-header />
      </div>
      <!-- Chat History -->
      <div class="chat-history">
          <chat-history />
      </div>
      <!-- Chat Input -->
      <div class="chat-message clearfix">
          <chat-input />
      </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
import ChatHeader from "@/components/ChatHeader.vue";
import ChatHistory from "@/components/ChatHistory.vue";
import ChatInput from "@/components/ChatInput.vue";
export default {
    name: "ChatComponent",
    components: {ChatInput, ChatHistory, ChatHeader},
    computed: {
        ...mapState({
            showChatState: state => state.ui.showChat,
            chatUserState: state => state.ui.chatUser,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>