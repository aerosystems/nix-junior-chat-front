<template>
  <div v-if="showChat">
      <!-- Chat Header -->
      <div class="chat-header clearfix">
          <chat-header />
      </div>
      <!-- Chat History -->
      <div class="chat-history">
          <!--                            <chat-history/>-->
      </div>
      <!-- Chat Input -->
      <div class="chat-message clearfix">
          <!--                            <chat-input/>-->
      </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
import ChatHeader from "@/components/ChatHeader.vue";
export default {
    name: "ChatComponent",
    components: {ChatHeader},
    computed: {
        ...mapState({
            showChat: state => state.ui.showChat,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>