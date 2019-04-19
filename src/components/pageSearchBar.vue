<template>
    <div class="page-search-bar">
        <button><img src="../assets/mylogo.png" alt="" @click="gohome"></button><!-- 注释去空格
        --><input type="text" v-model='searchTexts' @keydown.enter='searchList'>
    </div>
</template>

<script>

// import searchResult from './searchResult.vue'


export default {
    name: 'pageSearchBar',
    components: {
        // searchResult,
    },
    props: ['search'],
    data() {
        return {
            searchTexts: this.search
        }
    },
    methods: {
        searchList() {
            if(this.searchTexts!=='') {
                this.$router.push(`/search/${this.searchTexts}`)
            }
        },
        gohome() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .page-search-bar {
        width: 100%
    }
    button {
        width: 20%;
        vertical-align: middle;
        padding: 10px;
    }
    img {
        width: 100%;
    }
    input {
        width: 80%;
        border: 1px solid #c2c2c2;
        height: 30px;
        border-radius: 15px;
        padding-left: 100px;
        padding-left: 10px;
    }


</style>
