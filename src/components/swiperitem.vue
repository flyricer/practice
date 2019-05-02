<template>
    <div class="wiper-item">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'swiperItem',
    data() {
        return {

}
    },
    mounted() {
        this.$nextTick(()=>{
       
        })
    },
};
</script>

<style lang="scss" scoped>
    .wiper-item {
        width: 100%;
    }

</style>
