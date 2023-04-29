<template>
    <div class="clearfix">
        <img :src="blockedUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ blockedUser.username }}</div>
            <div class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
        <div>
            <button @click="unblockUser(blockedUser)"
                    class="btn btn-outline-secondary trash">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "BlockedUsersItem",
    props: {
        blockedUser: {
            type: Object,
            required: true,
        },
    },
    methods: {
        unblockUser(user) {
            this.$store.dispatch('user/unblockUser', user);
        },
    },

}
</script>

<style lang="scss" scoped>

</style>