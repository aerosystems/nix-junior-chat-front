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

}
</script>

<style lang="scss" scoped>

</style>