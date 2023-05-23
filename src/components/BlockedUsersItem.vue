<template>
    <div class="clearfix">
        <img :src="blockedUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ blockedUser.username }}</div>
            <div v-if="blockedUser.status === 'online'" class="status">
                <i class="fa fa-circle online"></i> online
            </div>
            <div v-else class="status">
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