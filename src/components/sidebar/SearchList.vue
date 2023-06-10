<template>
    <ul class="list-unstyled chat-list mt-2 mb-0">
        <li v-for="foundUser in foundUsersState" :key="foundUser.id">
            <search-item :foundUser="foundUser"/>
        </li>
        <li v-if="foundUsersState.length === 0 && searchInputState !== ''" class="clearfix not-react">
            Users not found
        </li>
    </ul>
</template>

<script>
import SearchItem from "@/components/sidebar/SearchItem.vue";
import {mapState} from 'vuex'

export default {
    name: "SearchList",
    components: {SearchItem},
    computed: {
        ...mapState({
            searchInputState: state => state.ui.searchInput,
            foundUsersState: state => state.ui.foundUsers,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>