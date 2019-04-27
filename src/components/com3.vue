<template>
    <div class="swiper-slide-container">
        <div class="swiper-container">
            <ul class="swiper-text">
                <li
                :class="{active: currentIndex === index}"
                v-for="(item, index) in itemList" 
                :key="item.id"
                @click="changePic(index)">
                    <a>{{item.id}}</a>
                </li>
            </ul>
            <transition-group class="swiper-img-container" tag="ul" :name="slideDirect ? 'forward' : 'backward'" ref="swiperitem">
                <li v-for="(item, index) in itemList" 
                    :key="item.id" 
                    v-show="currentIndex === index"
                    @touchstart="touchStart($event)"
                    @touchmove="touchMove($event)"
                    @touchend="touchEnd($event)">
                    <img :src="item.img">
                    
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { Transform } from 'stream';
import { setTimeout } from 'timers';


export default {
    name: 'swiper',
    data () {
        return {
            itemList:[],
            currentIndex: 0,
            startX: 0,
            moveX: 0,
            itemlength: 0,
            itemWidth: 0,
            slideDirect: true,
            ismove: false,
            tabscroll: true
        }
    },
    mounted () {
        this.getData();
        this.$nextTick(()=>{
            this.beforeswiper();
        }) 
        
    },
    updated() {
        // console.log(this.$refs.imglist[this.currentIndex])
    },
    watch: {
        itemList() {
            this.itemlength = this.itemList.length
        }
    },
    methods: {
        getData(){	    
            this.axios.get('http://www.liulongbin.top:3005/api/getlunbo')
            .then((res)=>{ 	  
                this.itemList=res.data.message
                // console.log(this.itemList)
                // this.$nextTick(()=>{
                //     this.freshWidth(); 
                // }) 		   	    		
            })
        },

        changePic(index) {
            if (index > this.currentIndex) {
                this.slideDirect = true
            } else {
                this.slideDirect = false
            }
            if (this.tabscroll) {
                this.tabscroll = false
                this.currentIndex = index
                setTimeout(() => {
                    this.tabscroll = true
                },500)
                

            }

            // this.currentIndex = index
        },

        beforeswiper () {
            this.itemWidth = document.body.clientWidth
        },
        touchStart(e){
            this.startX = e.touches[0].clientX;
        },
        touchMove(e){
            let endX = e.touches[0].clientX;
            this.moveX = endX - this.startX;
            this.ismove = true;
        },
        touchEnd(e){
            if (this.ismove) {
                if (this.moveX <= 0) {
                
                    if (this.currentIndex >= this.itemlength-1) {
                        this.currentIndex = this.itemlength-1
                    }else{
                        this.currentIndex++
                        this.slideDirect = true
                    }
                }else{
                    if (this.currentIndex <= 0) {
                        this.currentIndex = 0
                    }else{
                        this.currentIndex--
                        this.slideDirect = false
                    }
                }
            }
            
        },



    }
}
</script>

<style lang="scss" scoped>
.swiper-slide-container {
    width: 100%;
    .swiper-container {
        width: 100%;
        position: relative;
        .swiper-text{
            width: 100%;
            display: flex;
            justify-content: space-around;
            li{
                text-align: center;
                flex: 1;
                a{
                    display: block
                }
            }
            .active {
                background-color: #c2c2c2;
            }
        }
        .swiper-img-container {
            position: absolute;
            width: 100%;
            li {
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;
                img {
                    width: 100%;
                }
            }
        }
    }
  }
// 动画
.forward-enter-active, 
.forward-leave-active {
  transition: all 1s;
}

.forward-enter {
  transform: translateX(100%);
}

.forward-leave-to {
  transform: translateX(-100%);
}

.backward-enter-active, 
.backward-leave-active {
  transition: all 1s;
}
.backward-enter {
  transform: translateX(-100%);
}

.backward-leave-to {
  transform: translateX(100%);
}
</style>
