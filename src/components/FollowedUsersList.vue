<template>
        <ul v-if="showFollowedUsers" class="list-unstyled chat-list mt-2 mb-0">
            <li v-for="followedUser in followedUsers" :key="followedUser.id">
                <followed-users-item :followedUser="followedUser"/>
            </li>
        </ul>
</template>

<script>
import FollowedUsersItem from "@/components/FollowedUsersItem.vue";
import { mapState } from 'vuex'
export default {
    name: "FollowedUsersList",
    components: {FollowedUsersItem},
    computed: {
        ...mapState({
            showFollowedUsers: state => state.ui.showFollowedUsers,
            followedUsers: state => state.user.followedUsers,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>