<template>

    <div class="goodsnum">
        <button class="reduce" @click="reduce">-</button>
        <input class="numbox" type="number" ref="numbox" :value="initcount" @change="countChanged"/>
        <button class="add" @click="add">+</button>
    </div>

</template>

<script>


export default {
    props: ["initcount", "goodsid"],
    data() {
        return {
            // numboxCount: this.initcount
        }

    },
    methods: {
        add() {
            this.$refs.numbox.value = parseInt(this.$refs.numbox.value) + 1
            // console.log(this.initcount)
            console.log(typeof this.$refs.numbox.value)
        },
        reduce() {
            if (this.$refs.numbox.value <= 0) {
                return
            }
            this.$refs.numbox.value = parseInt(this.$refs.numbox.value) - 1
        },
        countChanged() {
            // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
            console.log(111)
            this.$store.commit("updateGoodsInfo", {
                id: this.goodsid,
                count: this.$refs.numbox.value
            });
        }
    }
}
</script>

<style scoped>

</style>
