<template>
  <ul v-if="showFollowedUsers" class="list-unstyled chat-list mt-2 mb-0">
    <li v-for="followedUser in followedUsers" :key="followedUser.id">
      <user-list-item :user="followedUser"
                      :chat="{}"
                      :doOnClickItemBody="openChat"
                      :doOnClickTrashButton="unfollowUser"
      />
    </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex'
import ChatService from "@/services/chat.service";
import UserListItem from "@/components/sidebar/UserListItem.vue";

export default {
  name: "FollowedUsersList",
  components: {UserListItem},
  computed: {
    ...mapState({
      showFollowedUsers: state => state.ui.showFollowedUsers,
      followedUsers: state => state.user.user.followedUsers,
    })
  },
  methods: {
    openChat(user, chat) {
      this.$store.dispatch('ui/showChat');
      this.$store.dispatch('chat/setCompanion', user);
      if (chat.chatId !== undefined) {
        this.$store.dispatch('chat/setChatId', chat.chatId)
        this.$store.dispatch('chat/getHistoryMessages', chat.chatId);
      } else {
        ChatService.getChatId(user.id).then(
            response => {
              this.$store.dispatch('chat/setChatId', response.data.data.id);
              this.$store.dispatch('chat/getHistoryMessages', response.data.data.id);
            },
            error => {
              if (error.response.status === 404) {
                ChatService.createChat(user.id).then(
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
    unfollowUser(user, chat) {
      this.$store.dispatch('chat/deleteChat', chat.chatId);
      this.$store.dispatch('chat/clearChat');
      this.$store.dispatch('user/unfollowUser', user);
      this.$store.dispatch('user/setUser');
    },
  },
}
</script>

<style lang="scss" scoped>

</style>