<template>
    <div class="back-top" @click="backTop">
        <img src="@/assets/img/common/top.png" alt="">
    </div>
</template>

<script>
export default {
    name: "BackTop",
    methods: {
        backTop() {
            this.$emit('backToop')
        }
    }
}
</script>

<style scoped>
    .back-top {
        position: fixed;
        right: 10px;
        bottom: 45px;
    }

    .back-top img {
        width: 43px;
        height: 43px;
    }
</style>