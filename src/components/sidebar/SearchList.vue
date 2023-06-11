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

    <ul class="list-unstyled chat-list mt-2 mb-0">
        <li v-for="foundUser in foundUsers" :key="foundUser.id">
            <search-item :foundUser="foundUser"/>
        </li>
        <li v-if="foundUsers.length === 0 && searchQuery !== ''" class="clearfix not-react">
            Users not found
        </li>
    </ul>
</template>

<script>
import SearchItem from "@/components/sidebar/SearchItem.vue";
import UserService from "@/services/user.service";

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
                    //console.log(error);
                    this.content =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    },
    components: {SearchItem},
}
</script>

<style lang="scss" scoped>

</style>