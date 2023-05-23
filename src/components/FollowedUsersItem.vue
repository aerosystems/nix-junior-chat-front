<template>
    <div @click="openChat(followedUser)"
         @mouseover="showTrashButton[followedUser.id] = true"
         @mouseleave="showTrashButton[followedUser.id] = false"
         class="clearfix">
        <img :src="followedUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ followedUser.username }}</div>
            <div v-if="followedUser.status === 'online'" class="status">
                <i class="fa fa-circle online"></i> online
            </div>
            <div v-else class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
        <div>
            <button @click="unfollowUser(followedUser)"
                    v-if="showTrashButton[followedUser.id]"
                    class="btn btn-outline-secondary trash">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "FollowedUsersItem",
    props: {
        followedUser: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showTrashButton: [],
        }
    },
    methods: {
        openChat(user) {
            this.$store.dispatch('ui/showChat');
            this.$store.dispatch('chat/setCompanion', user);
            this.$store.dispatch('chat/getHistoryMessages', {
                senderId: this.userState.id,
                recipientId: user.id,
            });
        },
        unfollowUser(user) {
            this.$store.dispatch('user/unfollowUser', user);
        },
    },
    computed: {
        ...mapState({
            userState: state => state.user.user,
        }),
    },
}
</script>

<style lang="scss" scoped>

</style>