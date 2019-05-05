<template>
    <div class="com-container">
        <div class='navWrapper' ref='navWrapper'>
            <ul class='nav-list' ref='navList'>
                <li class='nav-item' v-for="(item,index) in navList" 
                    :class="{active: currentIndex == index}" 
                    @click="tabToSwiper(index)" :key="index"> 
                    <a>{{item.name}}</a>
                </li>
            </ul>
        </div>
        <div class="componentContainer" ref='componentContainer'>
            <div class="componentList" v-for="(item,index) in tabList" 
                :key="item.id"
                ref="swiperItem"
                @touchstart="touchStart($event,index)"
                @touchmove="touchMove($event,index)"
                @touchend="touchEnd($event,index)">
                <!-- <keep-alive> -->
                <component :is="item.component"></component>
                <!-- </keep-alive> -->
            </div>
        </div>
    </div>
</template>

<script>

import example1 from './example1.vue'
import example2 from './example2.vue'
import example3 from './example3.vue'
import example4 from './example4.vue'
import example5 from './example5.vue'

export default {
    data() {
        return { 
            navList: [
                {name: '页面一'}, 
                {name: '页面二'}, 
                {name: '页面三'}, 
                {name: '页面四'}, 
                {name: '页面五'}, 
            ],
            tabList: [
                {id: 1, component: 'example1'}, 
                {id: 2, component: 'example2'}, 
                {id: 3, component: 'example3'},  
                {id: 4, component: 'example4'},  
                {id: 5, component: 'example5'},  
            ],
            currentIndex: 0,
            startX: 0, //开始触摸的位置
            disX: 0, //移动距离
            ismove: false,
            itemWidth: 0,
            active: 0,
            itemLength: null,
            slideDirect: true,
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.beforeswiper();
            this.backlate1()
        })      
    },
    updated() {
        // this.beforeswiper();
        // this.backlate()
    },
    methods: {
        beforeswiper () {
            this.itemWidth = document.body.clientWidth
            this.itemLength = this.$refs.componentContainer.children.length
        },
        tabToSwiper(index) {
            let _index = index;
            (this.tabList).forEach((item,index) => {
                this.$refs.swiperItem[index].style.transform = 'translate3d('+ (index+this.active+this.currentIndex-_index)*this.itemWidth +'px,0,0)'
                // this.$refs.swiperItem[index].style.left = (parseInt(this.$refs.swiperItem[index].style.left)+(this.currentIndex-_index)*this.itemWidth)+'px'
            })
            this.active += this.currentIndex-_index
            this.currentIndex = _index;
        },

        backlate1 (offert) {
            if(!offert) offert = 0;
            (this.tabList).forEach((item,index) => {
                this.$refs.swiperItem[index].style.transform = 'translate3d('+ ((index+this.active)*this.itemWidth+offert) +'px,0,0)'
                // this.$refs.swiperItem[index].style.left = (index+this.active)*this.itemWidth+offert+'px'
            })
            
        },
        backlate2 (offert) {
            if(!offert) offert = 0;
            (this.tabList).forEach((item,index) => {
                this.$refs.swiperItem[index].style.transform = 'translate3d('+ ((index+this.active)*this.itemWidth+offert) +'px,0,0)'
                // this.$refs.swiperItem[index].style.left = (index+this.active)*this.itemWidth+offert+'px'
                this.$refs.swiperItem[index].style.transition = 'transform .5s'
            });
            
            
        },
        touchStart(e,index){
            this.startX = e.touches[0].clientX;
        },
        touchMove(e,index){
            var endX = e.touches[0].clientX;
            this.disX = endX - this.startX;
            this.ismove = true;
            this.backlate1 (this.disX)
        },
        touchEnd(e,index){
            if (this.ismove) {
                if (this.disX <= 0) {
                    if (index >= this.itemLength-1) {
                        this.backlate2 (0)
                        return
                    }
                    this.backlate2 (-this.itemWidth);
                    this.active--; 
                    this.currentIndex++
                }else{
                    if (index <= 0) {
                        this.backlate2 (0)
                        return
                    }
                    this.backlate2 (this.itemWidth)
                    this.active++;
                    this.currentIndex--
                }
            } else {
                this.backlate2 (0);
            }
            
        },
      
       
    },

    components: {
        example1,
        example2,
        example3,
        example4,
        example5,
    }

}
</script>

<style lang="scss" scoped>
.com-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: yellow;
    .navWrapper{
        width: 100%;
        overflow: hidden;
        position: relative;
        margin: 20px auto;
        border-bottom: 1px solid #999999;
        .nav-list{
            display: flex;
            justify-content: space-around;
            .nav-item{
                flex:1;
                text-align: center;
            }
            .active {
                color: red;
            };
        }
    };
    .componentContainer{
        width: 100%;
        height: 100%;
        white-space: nowrap;
        position: relative;
        .componentList{
            width: 100%;
            height: 100%;
            display: inline-block;
            position: absolute;
            // transition: all .5s
        }
    }
    
}
</style>
