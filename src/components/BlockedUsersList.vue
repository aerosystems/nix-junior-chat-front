<template>
    <ul v-if="showBlockedUsers" class="list-unstyled chat-list mt-2 mb-0" >
        <li>
            <div @click="showSettings()" class="clearfix row">
                <div class="col-lg-6">
                    <font-awesome-icon icon="angle-left"/>
                </div>
                <div class="col-lg-6 text-right">Back</div>
            </div>
        </li>
        <li v-for="blockedUser in blockedUsers" :key="blockedUser.id">
            <blocked-users-item :blockedUser="blockedUser"/>
        </li>
    </ul>
</template>

<script>
import BlockedUsersItem from "@/components/BlockedUsersItem.vue";
import { mapState } from 'vuex'
export default {
    name: "BlockedUsersList",
    components: {BlockedUsersItem},
    methods: {
        showSettings() {
            this.$store.dispatch('ui/showSettings');
        },
    },
    computed: {
        ...mapState({
            showBlockedUsers: state => state.ui.showBlockedUsers,
            blockedUsers: state => state.user.blockedUsers,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>