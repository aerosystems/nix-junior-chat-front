<template>
    <ul class="list-unstyled chat-list mt-2 mb-0">
        <li v-for="foundUser in foundUsers" :key="foundUser.id">
            <search-item :foundUser="foundUser"/>
        </li>
        <li v-if="foundUsers.length === 0 && searchInput !== ''">
            <div class="clearfix">
                No users found
            </div>
        </li>
    </ul>
</template>

<script>
import SearchItem from "@/components/SearchItem.vue";
import {mapState} from 'vuex'

export default {
    name: "SearchList",
    components: {SearchItem},
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