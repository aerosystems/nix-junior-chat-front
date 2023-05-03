<template>
    <div @click="openChat(foundUser)" class="clearfix">
        <img :src="foundUser.image" alt="avatar">
        <div class="about">
            <div class="name">{{ foundUser.username }}</div>
            <div class="status">
                <i class="fa fa-circle offline"></i> online
            </div>
        </div>
    </div>
</template>

<script>
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
        }
    }
}
</script>

<style lang="scss" scoped>

</style>