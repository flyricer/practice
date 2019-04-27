<template>
    <ul class="tab-item">
        <li
        :class="{active: currentIndex === index}"
        v-for="(item, index) in itemList" 
        :key="item.id"
        @click="changePic(index)">
            <a>{{item.id}}</a>
        </li>
    </ul>

</template>

<script>


export default {
    name: 'tab',
    data () {
        return {

        }
    },
    mounted () {
       
    },

    methods: {
       
    }
}
</script>

<style lang="scss" scoped>

</style>
