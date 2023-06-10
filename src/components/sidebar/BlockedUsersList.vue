<template>
    <ul v-if="showBlockedUsersState" class="list-unstyled chat-list mt-2 mb-0" >
        <li>
            <div @click="showSettings()" class="clearfix row">
                <div class="col-lg-6">
                    <font-awesome-icon icon="angle-left"/>
                </div>
                <div class="col-lg-6 text-right">Back</div>
            </div>
        </li>
        <li v-if="blockedUsersState.length === 0" class="clearfix not-react">
           Blacklist in empty
        </li>
        <li v-for="blockedUser in blockedUsersState" :key="blockedUser.id">
            <blocked-users-item :blockedUser="blockedUser"/>
        </li>
    </ul>
</template>

<script>
import BlockedUsersItem from "@/components/sidebar/BlockedUsersItem.vue";
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
            showBlockedUsersState: state => state.ui.showBlockedUsers,
            blockedUsersState: state => state.user.blockedUsers,
        })
    }
}
</script>

<style lang="scss" scoped>

</style>