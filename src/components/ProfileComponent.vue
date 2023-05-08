<template>
    <div v-if="showProfileState" class="profile-info">
        <div class="profile-image">
            <img :src="userState.image"
                 class="rounded-circle"
                 alt="avatar"
            >
        </div>
        <div @mouseover="showUsernameEditIcon = true" class="profile-username text-center">{{ userState.username }}
            <font-awesome-icon v-if="showUsernameEditIcon" icon="pen-to-square"/>
        </div>

    </div>

</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "ProfileComponent",
    data() {
        return {
            showUsernameEditIcon: false,
        }
    },
    computed: {
        ...mapState({
            showProfileState: state => state.ui.showProfile,
            userState: state => state.user.user,
        })
    }

}
</script>

<style scoped>
.profile-info {
    text-align: center;
    margin-top: 20px;
}

.profile-info img {
    width: 200px;
    height: 200px;
}

.profile-username {
    font-size: 20px;
    margin-top: 20px;
}

</style>