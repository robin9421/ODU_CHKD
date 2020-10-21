<template>
<v-container>
    <h2 v-if="user == 'Admin'"></h2>
    <h2 v-else-if="user == 'Pre Op Coordinator'"></h2>
    <h2 v-else></h2>
    <router-view></router-view>
</v-container>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        user() {
            return this.$store.getters.role;
        },
    },
};
</script>
