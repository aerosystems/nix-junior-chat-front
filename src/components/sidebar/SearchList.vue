<template>
  <div class="input-group mb-0">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fa fa-search"></i></span>
      </div>
      <input v-model="searchQuery"
             @input="checkInputValue"
             @click="clearSidebar()"
             type="text" class="form-control" placeholder="Search...">
    </div>
  </div>

  <ul v-if="showSearchState" class="list-unstyled chat-list mt-2 mb-0">
    <li v-for="foundUser in foundUsers" :key="foundUser.id">
      <user-list-item :user="foundUser"
                      :chat="{}"
                      :doOnClickItemBody="openChat"
                      :doOnClickTrashButton="() => {}"
      />
    </li>
    <li v-if="foundUsers.length === 0 && searchQuery !== ''" class="clearfix not-react">
      Users not found
    </li>
  </ul>
</template>

<script>
import UserService from "@/services/user.service";
import ChatService from "@/services/chat.service";
import UserListItem from "@/components/sidebar/UserListItem.vue";
import {mapState} from "vuex";

export default {
  name: "SearchList",
  data: () => ({
    searchQuery: '',
    foundUsers: []
  }),
  methods: {
    clearSidebar() {
      this.searchQuery = '';
      this.foundUsers = [];
      this.$store.dispatch('ui/clearSidebar');
    },
    checkInputValue() {
      if (this.searchQuery.length !== 0) {
        this.searchUser(this.searchQuery);
      } else {
        this.foundUsers = [];
      }
    },
    searchUser(query) {
      UserService.searchUser(query).then(
          response => {
            this.foundUsers = response.data.data;
          },
          error => {
            this.content =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    openChat(user, chat) {
      this.clearSidebar();
      this.$store.dispatch('ui/showChat');
      this.$store.dispatch('chat/setCompanion', user);
      if (chat != null) {
        this.$store.dispatch('chat/setChatId', chat.id)
        this.$store.dispatch('chat/getHistoryMessages', chat.id);
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
    }
  },
  computed: {
    ...mapState({
      showSearchState: state => state.ui.showSearch,
    }),
  },
  components: {UserListItem},
}
</script>

<style lang="scss" scoped>

</style>