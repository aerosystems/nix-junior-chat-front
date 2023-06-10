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
</template>

<script>
import UserService from "@/services/user.service";
import {mapState} from 'vuex'

export default {
    name: "SearchInput",
    data: () => ({
        searchQuery: '',
    }),
    watch: {
        searchQuery(newVal) {
            this.$store.dispatch('ui/setSearchInput', newVal)
        },
        searchInput(newVal) {
            this.searchQuery = newVal;
        },
    },
    methods: {
        clearSidebar() {
            this.$store.dispatch('ui/clearSidebar');
        },
        checkInputValue() {
            this.$store.dispatch('ui/setSearchInput', this.searchQuery);
            if (this.searchQuery.length !== 0) {
                this.searchUser(this.searchQuery);
            } else {
                this.$store.dispatch('ui/setFoundUsers', []);
            }
        },
        searchUser(query) {
            UserService.searchUser(query).then(
                response => {
                    this.$store.dispatch('ui/setFoundUsers', response.data.data);
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
    computed: {
        ...mapState({
            searchInput: state => state.ui.searchInput,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>