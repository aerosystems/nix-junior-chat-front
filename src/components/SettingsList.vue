<template>
    <div v-if="showSettings">
        <ul class="list-unstyled chat-list mt-2 mb-0">
            <li>
                <div class="name row">
                    <div class="col-lg-6">Username</div>
                    <div class="col-lg-6 text-right">
                        <font-awesome-icon icon="angle-right"/>
                    </div>
                </div>
            </li>
            <li>
                <div class="name row">
                    <div class="col-lg-6">Password</div>
                    <div class="col-lg-6 text-right">
                        <font-awesome-icon icon="angle-right"/>
                    </div>
                </div>
            </li>
            <li>
                <div class="name row">
                    <div class="col-lg-6">Image</div>
                    <div class="col-lg-6 text-right">
                        <font-awesome-icon icon="angle-right"/>
                    </div>
                </div>
            </li>
            <li>
                <div @click="clearSidebar(); toggleShowBlacklist()" class="name row">
                    <div class="col-lg-6">Blacklist</div>
                    <div class="col-lg-6 text-right">
                        <font-awesome-icon icon="angle-right"/>
                    </div>
                </div>
            </li>
            <li>
                <div @click="handleLogout" class="name">Logout</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "SettingsList",
    methods: {
        handleLogout() {
            this.$store.dispatch('user/logout');
        },
        clearSidebar() {
            this.$store.dispatch('ui/clearSidebar');
        },
        showBlockedUsers() {
            this.$store.dispatch('ui/showBlockedUsers');
        },
    },
    computed: {
        ...mapState({
            showSettings: state => state.ui.showSettings,
        })
    }

}
</script>

<style lang="scss" scoped>

</style>