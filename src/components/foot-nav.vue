<template>
    <div class="foot-nav-containner">
        <ul class="bottom-nav">
            <router-link tag="li" :to='{name:"index"}' class="bottom-nav__li iconfont iconzhuye bottom-nav__li--home"></router-link>
            <router-link tag="li" :to='{name:"search"}' class="bottom-nav__li iconfont iconsousuoleimu bottom-nav__li--search"></router-link>
            <router-link tag="li" :to='{name:"shopcar"}' class="bottom-nav__li iconfont icongouwuche bottom-nav__li--car"><span class="goodsNumber" v-show="goddsNumber&&goddsNumber>0">{{goddsNumber}}</span></router-link>
            <!-- <router-link tag="li" :to='{name:"shopcar"}' class="bottom-nav__li iconfont icongouwuche bottom-nav__li--car"></router-link> -->
            <router-link tag="li" :to='{name:"usercenter"}' class="bottom-nav__li iconfont iconwode bottom-nav__li--vip"></router-link>
        </ul>
     </div>
</template>

<script>
export default {
    name: 'footNav',
    data () {
        return {
         
        }
    },
    computed:{
        goddsNumber(){
            return this.$store.getters.goddsNumber
        }
    }
}
</script>

<style scoped lang="scss">
    // @import '../base/css/base.scss';
    .router-link-active{
        color:#fd0909;
    }
    .foot-nav-containner{
        position: fixed;
        bottom:0;
        width: 100%;
        z-index: 1001;
        border-top: 0.014rem solid #ddd;
        background: #fff;
        .bottom-nav{
            display: flex;
            .bottom-nav__li{
                flex:1;
                align-items:center;
                justify-content:center;
                text-align: center;
                height:1.111rem;
                line-height:1.111rem;
                font-size: 24px;
                position: relative;
                padding: 16px;
                 .goodsNumber{
                    position: absolute;
                    top:0.1rem;
                    left:1rem;
                    width:1rem;
                    height: 1rem;
                    background: red;
                    color: #fff;
                    border-radius: 50%;
                    // line-height:0.38rem;
                    text-align: center;
                    font-size: 13px;
                }
                
            }
        }
    }


    
    


</style>
