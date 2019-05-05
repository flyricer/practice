<template>
    <div class="swiper-component" ref="swipercomponent">
       <swiper :itemHeight='itemHeight' :pageNum='pageNum'>
           <swiperItem>
               <div class="item" :style='itemStyle' v-for="item in itemList" :key="item.id">{{item.text}}</div>
           </swiperItem>
       </swiper>
    </div>
</template>

<script>
import swiper from './swiper.vue';
import swiperItem from './swiperitem.vue';


export default {
    name: 'swiperComponent',
    props:['mainHeight'],
    data () {
        return {
            itemList:[
                {id:1, text:'第一页'},
                {id:2, text:'第二页'},
                {id:3, text:'第三页'},
            ],
            pageNum: 0,
            itemHeight: this.mainHeight
            // itemHeight: 706
        }
    },
    mounted () {
        this.freshSize();
        this.$nextTick(()=>{

        })     
    },
    computed:{
        itemStyle() {
            let style = {
                height: this.itemHeight + "px",
            }
            return style
        }
    },
    methods: {
        freshSize() {
            this.$refs.swipercomponent.style.height = this.itemHeight + 'px';
            this.pageNum = this.itemList.length
        },
    },
    components: {
        swiper,
        swiperItem
    }
}
</script>

<style lang="scss" scoped>
.swiper-component {
    width: 100%;  
    .item{
        background-color:blueviolet;
        text-align: center;
        border: 1px solid red
    }
}  
</style>
