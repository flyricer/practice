<template>
    <div class="go-back"> 
        <mt-header class="goback" @click="goBack" v-show="flag">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
    </div>
</template>

<script>

export default {
    name: 'goBack',
    data() {
        return {    
          flag: false 
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
    }
    },
    mounted() {
        this.flag = this.$route.path === "/home" ? false : true;
    }
    
  }
</script>

<style lang="scss" scoped>
    .go-back {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }
</style>
