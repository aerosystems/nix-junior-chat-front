<template>
    <div id="app">
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
import EventBus from "./common/EventBus";

export default {
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    },
    mounted() {
        EventBus.on("logout", () => {
            this.logOut();
        });
    },
    beforeUnmount() {
        EventBus.remove("logout");
    }
};
</script>

<style></style>