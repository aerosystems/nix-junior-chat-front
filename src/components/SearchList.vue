<template>
        <div>
            <ul class="list-unstyled chat-list mt-2 mb-0">
                <li v-for="foundUser in foundUsers" :key="foundUser.id">
                  <search-item :foundUser="foundUser" />
                </li>
            </ul>
        </div>
        <div v-if="searchError !== ''">
            <ul class="list-unstyled chat-list mt-2 mb-0">
                <li>
                    <div class="clearfix">
                        <div>{{ searchError }}</div>
                    </div>
                </li>
            </ul>
        </div>
</template>

<script>
import SearchItem from "@/components/SearchItem.vue";
import UserService from "@/services/user.service";
import { mapState } from 'vuex'

export default {
    name: "SearchList",
    components: {SearchItem},
    methods: {
        searchUser() {
            UserService.searchUser(this.searchQuery).then(
                response => {
                    this.foundUsers = response.data.data;
                    this.searchError = "";
                },
                error => {
                    this.searchError = "Users not found"
                    console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    },
    computed: {
        ...mapState({
            searchInput: state => state.ui.searchInput,
            foundUsers: state => state.ui.foundUsers,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>