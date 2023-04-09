<template>
    <div>

    </div>
</template>

<script>
export default {
    name: 'LogoutPage',
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    beforeMount() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
    }
}
</script>

<style  scoped></style>