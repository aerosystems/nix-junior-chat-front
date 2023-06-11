<template>
  <ul v-if="showChatListState" class="list-unstyled chat-list mt-2 mb-0">
    <li v-for="chat in chatsState" :key="chat.id">
      <user-list-item :user="getUserFromPrivateChat(userState, chat)"
                      :chat="chat"
                      :doOnClickItemBody="openChat"
                      :doOnClickTrashButton="deleteChatUser"
      />
    </li>
  </ul>
</template>

<script>
import {mapState} from "vuex";
import UserListItem from "@/components/sidebar/UserListItem.vue";

export default {
  name: "ChatsList",
  components: {UserListItem},
  computed: {
    ...mapState({
      chatsState: state => state.user.user.chats,
      userState: state => state.user.user,
      showChatListState: state => state.ui.showChatList,
    })
  },
  methods: {
    openChat(user, chat) {
      this.$store.dispatch('ui/showChat');
      this.$store.dispatch('chat/setCompanion', user);
      this.$store.dispatch('chat/setChatId', chat.id)
      this.$store.dispatch('chat/getHistoryMessages', chat.id);
    },
    deleteChatUser(user, chat) {
        this.$store.dispatch('chat/deleteChat', chat.id);
        let tmp = [];
        user.chats.forEach(item => {
          if (item.id !== chat.id) {
            tmp = [...tmp, item];
          }
        });
        user.chats = tmp;
        this.$store.dispatch('user/setUser', user);
    },
    getUserFromPrivateChat(user, chat) {
      let res = {};
      if (chat.type === 'private') {
        chat.users.forEach(item => {
          if (item.id !== user.id) {
            res = item;
          }
        });
      }
      return res;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>