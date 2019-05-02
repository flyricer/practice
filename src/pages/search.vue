<template>
    <div class="container" ref="container">
        <div class='wrapper' ref='wrapper'>
            <ul class='scroller' ref='scroller'>
                <li class='content' v-for="(item,index) in tabs" :class="{active:num == index}" @click="tab(index,item.type)" :key="item.type"> 
                    <a class="tabvalue">{{item.title}}</a>
                </li>
            </ul>
        </div>
        <keep-alive>
            <component :is="componentId" :mainHeight='mainHeight'></component>
        </keep-alive>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getStyle} from '../base/js/util.js'

import tab1 from '../components/com1.vue'
import tab2 from '../components/com2.vue'
import tab3 from '../components/com3.vue'
import tab4 from '../components/com4.vue'
import tab5 from '../components/com5.vue'

export default {
    data() {
        return {    
            tabs: [
                {type: 'tab1', title: "全部"}, 
                {type: 'tab2', title: "热门"}, 
                {type: 'tab3', title: "推荐"}, 
                {type: 'tab4', title: "精选"}, 
                {type: 'tab5', title: "喜欢"}, 
                {type: 'tab6', title: "收藏"}, 
                {type: 'tab7', title: "个性"}, 
                {type: 'tab8', title: "拾遗"}, 
                ],
            num: 0,
            componentId: 'tab1',
            mainHeight: 0,
        }
    },

    mounted() {
        this.freshSize();
        console.log( this.mainHeight)
        window.onresize = () => {
            this.freshSize();
            console.log( this.mainHeight)
        };
        this.$nextTick(() => {
            this.initscroll();
            // this.scroll.refresh(); 
        })      
    },
    methods: {
        tab(index,v) {
            this.num = index;
            this.componentId = v;
        },
        freshSize() {
            let width = getStyle(this.$refs.scroller.children[0],'width');
            this.$refs.scroller.style.width = width*this.$refs.scroller.children.length + 'px';
            let cheight = getStyle(this.$refs.container,'height');
            let wheight = getStyle(this.$refs.wrapper,'height');
            this.mainHeight = cheight - wheight;
        },
        initscroll() {
            if (!this.scroll) {
                this.scroll =  new BScroll(this.$refs.wrapper, {
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: 'vertical',
                momentum: true
                })    
            } else {
                this.scroll.refresh()
            }
            // console.log(this.scroll)
        }
    },

    components: {
        tab1,
        tab2,
        tab3,
        tab4,
        tab5
    }

}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .wrapper{
        width: 100%;
        overflow: hidden;
        position: relative;
        left: 0;
        top: 0;
        z-index: 99;
        background-color: #ffffff;
        .scroller{
            white-space: nowrap;
            .content{
                display: inline-block;
                border-right: 1px solid #999999;
                &:last-child {border-right: none};
                .tabvalue {
                    padding: 4px 20px;
                    display: block;
                    text-decoration: none
                }
            }
            .active {
                background-color: #c2c2c2;
            };
        }
    }
}
</style>
