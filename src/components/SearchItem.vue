<template>
    <div @click="openChat(foundUser)" class="clearfix">
        <img :src="foundUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ foundUser.username }}</div>
            <div v-if="foundUser.status === 'online'" class="status">
                <i class="fa fa-circle online"></i> online
            </div>
            <div v-else class="status">
                <i class="fa fa-circle offline"></i> offline
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "SearchItem",
    props: {
        foundUser: {
            type: Object,
            required: true
        }
    },
    methods: {
        openChat(foundUser) {
            this.$store.dispatch('chat/setCompanion', foundUser);
            this.$store.dispatch('ui/showChat');
            this.$store.dispatch('chat/getHistoryMessages', {
                senderId: this.userState.id,
                recipientId: foundUser.id,
            });
        }
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