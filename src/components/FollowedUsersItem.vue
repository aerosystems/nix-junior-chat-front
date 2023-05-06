<template>
    <div @click="openChat(followedUser)" class="clearfix">
        <img :src="followedUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ followedUser.username }}</div>
            <div class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
        <div>
            <button @click="unfollowUser(followedUser)"
                    class="btn btn-outline-secondary trash">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: "FollowedUsersItem",
    props: {
        followedUser: {
            type: Object,
            required: true,
        },
    },
    methods: {
        openChat(user) {
            this.$store.dispatch('ui/showChat');
            this.$store.dispatch('chat/setCompanion', user);
        },
        unfollowUser(user) {
            this.$store.dispatch('user/unfollowUser', user);
        },
    },
}
</script>

<style lang="scss" scoped>

</style>