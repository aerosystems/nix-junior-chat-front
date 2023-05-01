<template>
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-search"></i></span>
        </div>
        <input v-model="searchQuery" @input="checkInputValue"
               @click="clearSidebar()"
               type="text" class="form-control" placeholder="Search...">
    </div>
</template>

<script>
export default {
    name: "SearchInput",
    data: () => ({
        searchQuery: '',
    }),
    methods: {
        clearSidebar() {
            this.$store.dispatch('ui/clearSideBar');
        },
        checkInputValue() {
            if (this.searchQuery.length >= 1) {
                this.$store.state.ui.searchInput = this.searchQuery;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>