<template>
        <ul class="list-unstyled chat-list mt-2 mb-0">
            <li v-for="followedUser in followedUsers" :key="followedUser.id">
                <followed-users-item :followedUser="followedUser"/>
            </li>
        </ul>
</template>

<script>
import FollowedUsersItem from "@/components/FollowedUsersItem.vue";
export default {
    components: {FollowedUsersItem},
    props: {
        followedUsers: {
            type: Array,
            required: true,
        },
    }
}
</script>

<style lang="scss" scoped>

</style>