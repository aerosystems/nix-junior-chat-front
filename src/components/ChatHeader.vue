<template>
    <div class="row">
        <div class="col-lg-6">
            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                <img :src="companionState.image" alt="avatar">
            </a>
            <div class="chat-about">
                <h6 class="m-b-0">{{ companionState.username }}</h6>
                <small>Last seen: 2 hours ago</small>
            </div>
        </div>

        <div v-if="blockedUsersState.some(blockedUser => blockedUser.id === companionState.id)"
             class="col-lg-6 text-right">
            <div>User is in Blacklist. Do you want to unblock?</div>
            <div>
                <button @click="unblockUser(companionState)" class="btn btn-outline-primary contact">
                    Yes
                </button>
                <button @click="clearChat()" class="btn btn-outline-secondary contact">
                    No, close this chat
                </button>
            </div>
        </div>

        <div v-if="!followedUsersState.some(followedUser => followedUser.id === companionState.id) && !blockedUsersState.some(blockedUser => blockedUser.id === companionState.id)"
             class="col-lg-6 text-right">
            <div>Do you want to add user to Contacts?</div>
            <div>
                <button @click="followUser(companionState)" class="btn btn-outline-primary contact">
                    Yes
                </button>
                <button @click="blockUser(companionState)" class="btn btn-outline-secondary contact">
                    No, block this user
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "ChatHeader",
    computed: {
        ...mapState({
            companionState: state => state.chat.companion,
            followedUsersState: state => state.user.user.followedUsers,
            blockedUsersState: state => state.user.user.blockedUsers,
        }),
    },
    methods: {
        followUser(user) {
            this.$store.dispatch('user/followUser', user);
        },
        blockUser(user) {
            this.$store.dispatch('user/blockUser', user);
        },
        unblockUser(user) {
            this.$store.dispatch('user/unblockUser', user);
        },
        clearChat() {
            this.$store.dispatch('ui/clearChat');
        },
    },

}
</script>

<style lang="scss" scoped>

</style>