<template>
        <div class="row">
            <div class="col-lg-6">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                    <img :src="chatUser.image" alt="avatar">
                </a>
                <div class="chat-about">
                    <h6 class="m-b-0">{{ chatUser.username }}</h6>
                    <small>Last seen: 2 hours ago</small>
                </div>
            </div>

            <div v-if="blockedUsers.some(blockedUser => blockedUser.id === chatUser.id)"
                 class="col-lg-6 text-right">
                <div>User is in Blacklist. Do you want to unblock?</div>
                <div>
                    <button @click="unblockUser(chatUser)" class="btn btn-outline-primary contact">
                        Yes
                    </button>
                    <button @click="clearChat()" class="btn btn-outline-secondary contact">
                        No, close this chat
                    </button>
                </div>
            </div>

            <div v-if="!followedUsers.some(followedUser => followedUser.id === chatUser.id) && !blockedUsers.some(blockedUser => blockedUser.id === chatUser.id)"
                 class="col-lg-6 text-right">
                <div>Do you want to add user to Contacts?</div>
                <div>
                    <button @click="followUser(chatUser)" class="btn btn-outline-primary contact">
                        Yes
                    </button>
                    <button @click="blockUser(chatUser)" class="btn btn-outline-secondary contact">
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
            chatUser: state => state.ui.chatUser,
            followedUsers: state => state.user.followedUsers,
            blockedUsers: state => state.user.blockedUsers,
        }),
    },

}
</script>

<style lang="scss" scoped>

</style>